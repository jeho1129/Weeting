package com.ssafy.backend.domain.member.service;

import com.ssafy.backend.domain.member.dto.MemberLoginRequestRecord;
import com.ssafy.backend.domain.member.dto.MemberLoginResponseRecord;
import com.ssafy.backend.domain.member.dto.MemberSignupRequestDto;
import com.ssafy.backend.domain.member.entity.Member;
import com.ssafy.backend.domain.member.exception.MemberErrorCode;
import com.ssafy.backend.domain.member.exception.MemberException;
import com.ssafy.backend.domain.member.repository.MemberRepository;
import com.ssafy.backend.global.component.jwt.service.JwtTokenService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenService jwtTokenService;

    /**
     * {@inheritDoc}
     */
    @Override
    public void signupMember(MemberSignupRequestDto signupRequest) {
        if (memberRepository.existsByEmail(signupRequest.getEmail())) {
            throw new MemberException(MemberErrorCode.EXIST_MEMBER_EMAIL);
        }

        // 비밀번호 암호화
        signupRequest.setPassword(passwordEncoder.encode(signupRequest.getPassword()));

        memberRepository.save(signupRequest.toEntity()); // 회원 정보 저장
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public MemberLoginResponseRecord loginMember(MemberLoginRequestRecord loginRequest) {
        Member member = memberRepository.findByEmail(loginRequest.email()).orElseThrow(()
                -> new MemberException(MemberErrorCode.NOT_FOUND_MEMBER));

        // 비밀번호 검증 로직
        String realPassword = member.getPassword();

        if(!passwordEncoder.matches(loginRequest.password(), realPassword)) {
            throw new RuntimeException("비밀번호가 일치하지 않습니다.");
        }

        return jwtTokenService.issueAndSaveTokens(member);
    }
}
