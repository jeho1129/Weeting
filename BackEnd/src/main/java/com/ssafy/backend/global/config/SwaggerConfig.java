package com.ssafy.backend.global.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.context.annotation.Configuration;

@OpenAPIDefinition(
        info = @Info(title = "특화 프로젝트 연습 API 명세서",
                description = "연습용 API 명세서",
                version = "v1"))
@Configuration
public class SwaggerConfig {

}
