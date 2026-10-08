window.TASTE_CONFIG = {
  title: "남돌 취향표",
  // 친구들에게 보여줄 이름 목록
  voters: [
    { id: "v1", name: "최애" },
    { id: "v2", name: "지마" },
    { id: "v3", name: "박죠Jae아" },
    { id: "v4", name: "아잉" },
    { id: "v5", name: "Ioai" }
  ],

  // 그룹은 여기만 수정하면 됩니다.
  // logo와 member image는 assets 폴더에 넣거나, 이미지 URL을 넣어도 됩니다.
  groups: [
    {
      id: "boynextdoor",
      name: "BOYNEXTDOOR",
      logo: "assets/groups/boynextdoor/logo.png",
      members: [
        { id: "member1", name: "멤버1", image: "assets/groups/boynextdoor/member1.jpg" },
        { id: "member2", name: "멤버2", image: "assets/groups/boynextdoor/member2.jpg" }
      ]
    },
    {
      id: "nctwish",
      name: "NCT WISH",
      logo: "assets/groups/nctwish/logo.png",
      members: [
        { id: "member1", name: "멤버1", image: "assets/groups/nctwish/member1.jpg" },
        { id: "member2", name: "멤버2", image: "assets/groups/nctwish/member2.jpg" }
      ]
    }
  ]
};
