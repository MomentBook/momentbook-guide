const fs = require('fs');

const base = {
  translationGroupId: "artgrp_eiffel_tower_ticket_20260622",
  slug: "eiffel-tower-ticket-stairs-vs-lift-guide-2026-06-22",
  category: "travel-guide",
  sourceCheckedDate: "2026-06-22"
};

const records = [
  { language: "en", title: "Eiffel Tower Tickets Explained: Stairs vs Lift, 2nd Floor vs Top", body: require('./body_en.json') },
  { language: "ko", title: "에펠탑 티켓 완전 분석: 계단 vs 엘리베이터, 2층 vs 정상", body: require('./body_ko.json') },
  { language: "ja", title: "エッフェル塔チケット完全解説：階段かエレベーターか、2階か最上階か", body: require('./body_ja.json') },
  { language: "zh", title: "埃菲尔铁塔门票全解析：楼梯还是电梯，二层还是顶层", body: require('./body_zh.json') },
  { language: "es", title: "Entradas de la Torre Eiffel: escaleras o ascensor, 2.ª planta o cima", body: require('./body_es.json') },
  { language: "pt", title: "Ingressos da Torre Eiffel: escadas ou elevador, 2.º andar ou topo", body: require('./body_pt.json') },
  { language: "fr", title: "Billets de la tour Eiffel : escaliers ou ascenseur, 2e étage ou sommet", body: require('./body_fr.json') },
  { language: "th", title: "ตั๋วหอไอเฟลแบบเจาะลึก: บันไดหรือลิฟต์ ชั้น 2 หรือยอดหอ", body: require('./body_th.json') },
  { language: "vi", title: "Vé tháp Eiffel: cầu thang hay thang máy, tầng 2 hay đỉnh tháp", body: require('./body_vi.json') }
];

const payload = records.map(r => ({
  ...base,
  language: r.language,
  title: r.title,
  body: r.body
}));

fs.writeFileSync('/Users/hansol/workspace/momentbook-guide/.work/artgrp_eiffel_tower_ticket_20260622_create_payload.json', JSON.stringify(payload, null, 2), 'utf8');
console.log('Payload written successfully');
