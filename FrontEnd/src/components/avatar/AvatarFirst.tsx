import { OutfitSet } from '@/types/custom';
import AvatarFirstBody from './AvatarFirstBody';
import AvatarFirstEyes from './AvatarFirstEyes';
import nest from '@/assets/images/avatarNest.svg';
import styles from '@/styles/avatar/Avatar.module.css';
import AvatarFirstOutfit from './AvatarFirstOutfit';
import { AvatarFirstProps } from '@/types/avatar';
import { useEffect, useState } from 'react';

const Avatar = ({ size, outfit, location, options }: AvatarFirstProps) => {
  const nickname = options?.nickname !== null && options?.nickname !== undefined ? options.nickname : '';
  const isNest = options?.isNest !== null && options?.isNest !== undefined ? options.isNest : false;
  const isAlive = options?.isAlive !== null && options?.isAlive !== undefined ? options.isAlive : true;
  const [electricEffect, setElectricEffect] = useState(false);
  const [outfitSet, setOutfitSet] = useState<OutfitSet>({ eyes: null, head: null, nametag: null });

  useEffect(() => {
    if (!isAlive) {
      setElectricEffect(true);
      setTimeout(() => {
        setElectricEffect(false);
      }, 1000);
    }
  }, [isAlive]);

  useEffect(() => {
    const eyeOutfit =
      outfit.filter((it) => it.part === 'eyes').length > 0 ? outfit.filter((it) => it.part === 'eyes')[0] : null;
    const headOutfit =
      outfit.filter((it) => it.part === 'head').length > 0 ? outfit.filter((it) => it.part === 'head')[0] : null;
    const nameTagOutfit =
      outfit.filter((it) => it.part === 'nametag').length > 0 ? outfit.filter((it) => it.part === 'nametag')[0] : null;

    setOutfitSet({
      eyes: eyeOutfit,
      head: headOutfit,
      nametag: nameTagOutfit,
    });

    console.log(outfitSet);
  }, [outfit]);

  return (
    <>
      <div className={styles.Avatar} style={{ width: `${size}px`, height: `${size}px` }}>
        {/* // nametag의 값이 로드 되면 무조건 null값이 아니기 때문에 nametag의 값 유무로 로딩되었는지 확인 */}
        <div>
          <AvatarFirstBody {...{ size, location, isAlive }} />
          <AvatarFirstEyes {...{ size, location, isAlive }} />
          <AvatarFirstOutfit {...{ size, location, outfitSet, nickname, isAlive }} />
        </div>
        {electricEffect ? (
          <>
            <div style={{ position: 'absolute', top: `${size * -0.25}px`, left: `${size * -0.25}px` }}>
              <div style={{ position: 'relative', width: `${size * 1.5}`, height: `${size * 1.5}` }}>
                <svg
                  width={size * 1.5}
                  height={size * 1.5}
                  viewBox="0 0 449 449"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M210.698 30.956C216.107 19.1672 232.858 19.1672 238.267 30.956L252.398 61.7545C256.466 70.6211 267.726 73.3965 275.449 67.436L302.274 46.7322C312.542 38.8074 327.374 46.592 326.685 59.5441L324.884 93.3818C324.366 103.123 333.046 110.814 342.654 109.125L376.028 103.259C388.803 101.013 398.319 114.799 391.689 125.947L374.37 155.072C369.384 163.457 373.496 174.301 382.788 177.27L415.066 187.586C427.42 191.534 429.44 208.163 418.389 214.954L389.518 232.694C381.206 237.801 379.809 249.314 386.656 256.262L410.443 280.395C419.547 289.633 413.607 305.296 400.667 306.173L366.859 308.464C357.126 309.124 350.538 318.668 353.372 328.002L363.219 360.426C366.987 372.836 354.449 383.945 342.583 378.707L311.583 365.025C302.658 361.086 292.389 366.475 290.561 376.058L284.212 409.343C281.781 422.084 265.517 426.092 257.444 415.941L236.353 389.419C230.281 381.783 218.684 381.783 212.612 389.419L191.522 415.941C183.449 426.092 167.184 422.084 164.754 409.343L158.404 376.058C156.576 366.475 146.307 361.086 137.383 365.025L106.382 378.707C94.5164 383.945 81.978 372.836 85.7468 360.426L95.5929 328.002C98.4275 318.668 91.8397 309.124 82.1067 308.464L48.2987 306.173C35.358 305.296 29.4179 289.633 38.5226 280.395L62.3089 256.262C69.1567 249.314 67.7588 237.801 59.4473 232.694L30.5766 214.954C19.5257 208.163 21.5448 191.534 33.8996 187.586L66.1769 177.27C75.4692 174.301 79.5816 163.457 74.5955 155.072L57.276 125.947C50.6466 114.799 60.1623 101.013 72.9369 103.259L106.311 109.125C115.919 110.814 124.599 103.123 124.081 93.3818L122.28 59.5441C121.591 46.5921 136.424 38.8074 146.692 46.7322L173.516 67.436C181.239 73.3964 192.499 70.6211 196.567 61.7545L210.698 30.956Z"
                    fill="#000000"
                  />
                </svg>
                <svg
                  className={`${styles.EffectBlink} ${styles.Effect}`}
                  width={size * 1.5}
                  height={size * 1.5}
                  viewBox="0 0 449 449"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M210.698 30.956C216.107 19.1672 232.858 19.1672 238.267 30.956L252.398 61.7545C256.466 70.6211 267.726 73.3965 275.449 67.436L302.274 46.7322C312.542 38.8074 327.374 46.592 326.685 59.5441L324.884 93.3818C324.366 103.123 333.046 110.814 342.654 109.125L376.028 103.259C388.803 101.013 398.319 114.799 391.689 125.947L374.37 155.072C369.384 163.457 373.496 174.301 382.788 177.27L415.066 187.586C427.42 191.534 429.44 208.163 418.389 214.954L389.518 232.694C381.206 237.801 379.809 249.314 386.656 256.262L410.443 280.395C419.547 289.633 413.607 305.296 400.667 306.173L366.859 308.464C357.126 309.124 350.538 318.668 353.372 328.002L363.219 360.426C366.987 372.836 354.449 383.945 342.583 378.707L311.583 365.025C302.658 361.086 292.389 366.475 290.561 376.058L284.212 409.343C281.781 422.084 265.517 426.092 257.444 415.941L236.353 389.419C230.281 381.783 218.684 381.783 212.612 389.419L191.522 415.941C183.449 426.092 167.184 422.084 164.754 409.343L158.404 376.058C156.576 366.475 146.307 361.086 137.383 365.025L106.382 378.707C94.5164 383.945 81.978 372.836 85.7468 360.426L95.5929 328.002C98.4275 318.668 91.8397 309.124 82.1067 308.464L48.2987 306.173C35.358 305.296 29.4179 289.633 38.5226 280.395L62.3089 256.262C69.1567 249.314 67.7588 237.801 59.4473 232.694L30.5766 214.954C19.5257 208.163 21.5448 191.534 33.8996 187.586L66.1769 177.27C75.4692 174.301 79.5816 163.457 74.5955 155.072L57.276 125.947C50.6466 114.799 60.1623 101.013 72.9369 103.259L106.311 109.125C115.919 110.814 124.599 103.123 124.081 93.3818L122.28 59.5441C121.591 46.5921 136.424 38.8074 146.692 46.7322L173.516 67.436C181.239 73.3964 192.499 70.6211 196.567 61.7545L210.698 30.956Z"
                    fill="#FFC42E"
                  />
                </svg>
              </div>
            </div>
            <div
              style={{
                position: 'absolute',
                bottom: '10%',
                left: `${size * 0.5 - (180 * size) / 600}px`,
              }}
            >
              <div
                style={{ position: 'relative', width: `${(190 * size) / 300}px`, height: `${(192 * size) / 300}px` }}
              >
                <svg
                  className={`${styles.Effect}`}
                  width={(180 * size) / 300}
                  height={(181 * size) / 300}
                  viewBox="0 0 190 192"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M119.937 179.881H128.496V191.1H119.937V179.881Z" fill="#FFC42E" />
                  <rect x="64.8086" y="179.881" width="8.55856" height="11.2186" fill="#FFC42E" />
                  <path
                    d="M0 95.4298C0 42.7253 42.7254 0 95.4299 0V0C147.659 0 190 42.3405 190 94.5701V124.227C190 155.637 164.537 181.099 133.127 181.099H56.8729C25.4629 181.099 0 155.637 0 124.227V95.4298Z"
                    fill="#FFC42E"
                  />
                  <path
                    d="M111.261 60.9003C111.261 64.4408 104.747 67.3109 96.7119 67.3109C88.6764 67.3109 82.1624 64.4408 82.1624 60.9003C82.1624 57.3598 88.6764 54.4897 96.7119 54.4897C104.747 54.4897 111.261 57.3598 111.261 60.9003Z"
                    fill="black"
                  />
                  <path
                    d="M111.261 60.9003C111.261 64.4408 104.747 67.3109 96.7119 67.3109C88.6764 67.3109 82.1624 64.4408 82.1624 60.9003C82.1624 57.3598 88.6764 54.4897 96.7119 54.4897C104.747 54.4897 111.261 57.3598 111.261 60.9003Z"
                    fill="black"
                  />
                  <path
                    d="M66.9871 46.5811L61.8915 51.7233L56.7977 46.5821L56.7976 46.582C56.4157 46.1967 55.896 45.9786 55.3523 45.9786C54.8085 45.9786 54.2888 46.1967 53.9069 46.582C53.5253 46.967 53.3125 47.4874 53.3125 48.0283C53.3125 48.5691 53.5253 49.0894 53.9068 49.4744C53.9069 49.4745 53.9069 49.4745 53.9069 49.4745L59.0127 54.6279L53.9052 59.7797L53.9051 59.7798C53.5235 60.1648 53.3107 60.6852 53.3107 61.2261C53.3107 61.7669 53.5235 62.2874 53.9051 62.6724C54.287 63.0577 54.8067 63.2757 55.3505 63.2757C55.8941 63.2757 56.4138 63.0577 56.7957 62.6725C56.7957 62.6724 56.7958 62.6724 56.7958 62.6724L61.8913 57.5327L66.9852 62.6741L66.9853 62.6742C67.3672 63.0595 67.8869 63.2775 68.4307 63.2775C68.9744 63.2775 69.4941 63.0595 69.876 62.6742C70.2576 62.2892 70.4704 61.7688 70.4704 61.2279C70.4704 60.6871 70.2576 60.1667 69.8761 59.7817C69.8761 59.7817 69.876 59.7817 69.876 59.7816L64.77 54.6281L69.8778 49.4736C69.8778 49.4736 69.8779 49.4736 69.8779 49.4736C70.2594 49.0886 70.4723 48.5682 70.4723 48.0273C70.4723 47.4865 70.2594 46.9661 69.8778 46.5811C69.4959 46.1958 68.9762 45.9777 68.4325 45.9777C67.8887 45.9777 67.369 46.1958 66.9871 46.5811L66.9871 46.5811Z"
                    fill="black"
                    stroke="black"
                    strokeWidth="1.89576"
                  />
                  <path
                    d="M134.81 46.5811L129.715 51.7233L124.621 46.5821L124.621 46.582C124.239 46.1967 123.719 45.9786 123.176 45.9786C122.632 45.9786 122.112 46.1967 121.73 46.582C121.349 46.967 121.136 47.4874 121.136 48.0282C121.136 48.5691 121.349 49.0894 121.73 49.4744C121.73 49.4745 121.73 49.4745 121.73 49.4745L126.836 54.6279L121.728 59.7797L121.728 59.7798C121.347 60.1648 121.134 60.6852 121.134 61.2261C121.134 61.7669 121.347 62.2873 121.728 62.6724C122.11 63.0577 122.63 63.2757 123.174 63.2757C123.717 63.2757 124.237 63.0577 124.619 62.6725C124.619 62.6724 124.619 62.6724 124.619 62.6724L129.714 57.5327L134.808 62.6741L134.809 62.6742C135.19 63.0595 135.71 63.2775 136.254 63.2775C136.798 63.2775 137.317 63.0595 137.699 62.6742C138.081 62.2892 138.294 61.7688 138.294 61.2279C138.294 60.6871 138.081 60.1667 137.699 59.7817C137.699 59.7817 137.699 59.7816 137.699 59.7816L132.593 54.6281L137.701 49.4736C137.701 49.4736 137.701 49.4736 137.701 49.4736C138.083 49.0885 138.296 48.5682 138.296 48.0273C138.296 47.4865 138.083 46.9661 137.701 46.581C137.319 46.1957 136.799 45.9777 136.256 45.9777C135.712 45.9777 135.192 46.1957 134.81 46.581L134.81 46.5811Z"
                    fill="black"
                    stroke="black"
                    strokeWidth="1.89576"
                  />
                </svg>
                <svg
                  className={`${styles.EffectBlink} ${styles.Effect}`}
                  width={(180 * size) / 300}
                  height={(182 * size) / 300}
                  viewBox="0 0 190 192"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M119.937 179.881H128.496V191.1H119.937V179.881Z" fill="black" />
                  <rect x="64.8086" y="179.881" width="8.55856" height="11.2186" fill="black" />
                  <path
                    d="M0 95.4298C0 42.7253 42.7254 0 95.4299 0V0C147.659 0 190 42.3405 190 94.5701V124.227C190 155.637 164.537 181.099 133.127 181.099H56.8729C25.4629 181.099 0 155.637 0 124.227V95.4298Z"
                    fill="black"
                  />
                  <path
                    d="M111.261 60.9003C111.261 64.4408 104.747 67.3109 96.7119 67.3109C88.6764 67.3109 82.1624 64.4408 82.1624 60.9003C82.1624 57.3598 88.6764 54.4897 96.7119 54.4897C104.747 54.4897 111.261 57.3598 111.261 60.9003Z"
                    fill="#FFC42E"
                  />
                  <path
                    d="M111.261 60.9003C111.261 64.4408 104.747 67.3109 96.7119 67.3109C88.6764 67.3109 82.1624 64.4408 82.1624 60.9003C82.1624 57.3598 88.6764 54.4897 96.7119 54.4897C104.747 54.4897 111.261 57.3598 111.261 60.9003Z"
                    fill="#FFC42E"
                  />
                  <path
                    d="M66.9871 46.5811L61.8915 51.7233L56.7977 46.5821L56.7976 46.582C56.4157 46.1967 55.896 45.9786 55.3523 45.9786C54.8085 45.9786 54.2888 46.1967 53.9069 46.582C53.5253 46.967 53.3125 47.4874 53.3125 48.0283C53.3125 48.5691 53.5253 49.0894 53.9068 49.4744C53.9069 49.4745 53.9069 49.4745 53.9069 49.4745L59.0127 54.6279L53.9052 59.7797L53.9051 59.7798C53.5235 60.1648 53.3107 60.6852 53.3107 61.2261C53.3107 61.7669 53.5235 62.2874 53.9051 62.6724C54.287 63.0577 54.8067 63.2757 55.3505 63.2757C55.8941 63.2757 56.4138 63.0577 56.7957 62.6725C56.7957 62.6724 56.7958 62.6724 56.7958 62.6724L61.8913 57.5327L66.9852 62.6741L66.9853 62.6742C67.3672 63.0595 67.8869 63.2775 68.4307 63.2775C68.9744 63.2775 69.4941 63.0595 69.876 62.6742C70.2576 62.2892 70.4704 61.7688 70.4704 61.2279C70.4704 60.6871 70.2576 60.1667 69.8761 59.7817C69.8761 59.7817 69.876 59.7817 69.876 59.7816L64.77 54.6281L69.8778 49.4736C69.8778 49.4736 69.8779 49.4736 69.8779 49.4736C70.2594 49.0886 70.4723 48.5682 70.4723 48.0273C70.4723 47.4865 70.2594 46.9661 69.8778 46.5811C69.4959 46.1958 68.9762 45.9777 68.4325 45.9777C67.8887 45.9777 67.369 46.1958 66.9871 46.5811L66.9871 46.5811Z"
                    fill="#FFC42E"
                    stroke="#FFC42E"
                    strokeWidth="1.89576"
                  />
                  <path
                    d="M134.81 46.5811L129.715 51.7233L124.621 46.5821L124.621 46.582C124.239 46.1967 123.719 45.9786 123.176 45.9786C122.632 45.9786 122.112 46.1967 121.73 46.582C121.349 46.967 121.136 47.4874 121.136 48.0282C121.136 48.5691 121.349 49.0894 121.73 49.4744C121.73 49.4745 121.73 49.4745 121.73 49.4745L126.836 54.6279L121.728 59.7797L121.728 59.7798C121.347 60.1648 121.134 60.6852 121.134 61.2261C121.134 61.7669 121.347 62.2873 121.728 62.6724C122.11 63.0577 122.63 63.2757 123.174 63.2757C123.717 63.2757 124.237 63.0577 124.619 62.6725C124.619 62.6724 124.619 62.6724 124.619 62.6724L129.714 57.5327L134.808 62.6741L134.809 62.6742C135.19 63.0595 135.71 63.2775 136.254 63.2775C136.798 63.2775 137.317 63.0595 137.699 62.6742C138.081 62.2892 138.294 61.7688 138.294 61.2279C138.294 60.6871 138.081 60.1667 137.699 59.7817C137.699 59.7817 137.699 59.7816 137.699 59.7816L132.593 54.6281L137.701 49.4736C137.701 49.4736 137.701 49.4736 137.701 49.4736C138.083 49.0885 138.296 48.5682 138.296 48.0273C138.296 47.4865 138.083 46.9661 137.701 46.581C137.319 46.1957 136.799 45.9777 136.256 45.9777C135.712 45.9777 135.192 46.1957 134.81 46.581L134.81 46.5811Z"
                    fill="#FFC42E"
                    stroke="#FFC42E"
                    strokeWidth="1.89576"
                  />
                </svg>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
        {isNest === true ? (
          <img className={styles.Nest} style={{ width: `${size}px`, height: `auto` }} src={nest} alt="" />
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default Avatar;
