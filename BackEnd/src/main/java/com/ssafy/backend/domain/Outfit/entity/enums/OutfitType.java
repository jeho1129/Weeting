package com.ssafy.backend.domain.Outfit.entity.enums;

public enum OutfitType {
    ROUND_GLASSES("동글안경", "눈장식", "testimg", "x", "동글동글 귀여운 스타일의 안경"),
    SQUARE_GLASSES("네모안경", "눈장식", "testimg", "x", "네모네모 귀여운 스타일의 안경"),
    ALIEN_SUNGLASSES("외계인선글라스", "눈장식", "testimg", "x", "외계뱁새로 진화"),
    GOONGYAE_EYEPATCH("궁예안대", "눈장식", "testimg", "x", "누구인가? 지금 누가 기침 소리를 내었어?"),
    BIT8_SUNGLASSES("8비트선글라스", "눈장식", "testimg", "x", "testt"),
    ORANGE_SUNGLASSES("오렌지선글라스", "눈장식", "testimg", "x", "testt"),
    PANDA_SHADOW("팬더섀도우", "눈장식", "testimg", "x", "testt"),
    OLYMPIC_SUNGLASSES("올림픽선글라스", "눈장식", "testimg", "x", "testt"),
    HIKING_SUNGLASSES("등산용선글라스", "눈장식", "testimg", "x", "testt"),
    GUILTY_DOG_EYES("잘못한강아지눈", "눈장식", "testimg", "x", "testt"),
    ONION_KOONGYA_EYES("양파쿵야눈", "눈장식", "testimg", "x", "testt"),
    TEARS("눈물", "눈장식", "testimg", "x", "testt"),
    SPROUT("새싹", "머리장식", "testimg", "x", "testt"),
    TRASH_BAG("쓰레기봉지", "머리장식", "testimg", "x", "testt"),
    ALIEN_HAIRBAND("외계인머리띠", "머리장식", "testimg", "x", "testt"),
    HEADSET("헤드셋", "머리장식", "testimg", "x", "testt"),
    CHERRY_BLOSSOM_HAIRBAND("벚꽃머리띠", "머리장식", "testimg", "x", "testt"),
    FRIED_EGG("계란후라이", "머리장식", "testimg", "x", "testt"),
    PARTY_HAT("고깔모자", "머리장식", "testimg", "x", "testt"),
    HIKING_HOOD("등산용두건", "머리장식", "testimg", "x", "testt"),
    SEDGE_HAT("삿갓", "머리장식", "testimg", "x", "testt"),
    GAT("갓", "머리장식", "testimg", "x", "testt"),
    FLORAL_SWIM_CAP("꽃무늬수영모", "머리장식", "testimg", "x", "testt"),
    FIRST_CROWN("1등왕관", "머리장식", "testimg", "1등 달성", "testt"),
    SECOND_CROWN("2등왕관", "머리장식", "testimg", "2등 달성", "testt"),
    THIRD_CROWN("3등왕관", "머리장식", "testimg", "3등 달성", "testt"),
    GOLD_MEDAL("금상", "이름표", "testimg", "1등 달성", "testt"),
    SILVER_MEDAL("은상", "이름표", "testimg", "2등 달성", "testt"),
    BRONZE_MEDAL("동상", "이름표", "testimg", "3등 달성", "testt"),
    SPECIAL_PRIZE("특선", "이름표", "testimg", "10등이상 달성", "testt"),
    HONORABLE_MENTION("입선", "이름표", "testimg", "50등이상 달성", "testt"),
    ONLY_VISIBLE_TO_GOOD_PEOPLE("착한사람눈에만보여요", "이름표", "testimg", "그외", "testt");

    private final String name;
    private final String part;
    private final String image;
    private final String getCondition;
    private final String description;

    OutfitType(String name, String part, String image, String getCondition, String description) {
        this.name = name;
        this.part = part;
        this.image = image;
        this.getCondition = getCondition;
        this.description = description;
    }

    // Getters for the fields
    public String getName() {
        return name;
    }

    public String getPart() {
        return part;
    }

    public String getImage() {
        return image;
    }

    public String getGetCondition() {
        return getCondition;
    }

    public String getDescription() {
        return description;
    }
}