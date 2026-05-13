const fs = require('fs');
const path = require('path');
const { MongoClient } = require('mongodb');

const ENV_PATH = path.resolve(__dirname, '..', '.env.development');
const PAYLOAD_PATH = path.resolve(
  __dirname,
  'generated',
  'festival-guides-2026-04.json',
);
const BACKUP_PATH = path.resolve(
  __dirname,
  'generated',
  'festival-guides-2026-04.translation-issues-backup.json',
);

const BODY_OVERRIDES = {
  'st-patricks-festival-dublin-2026-guide-2026-02-19::ko': {
    title:
      '세인트 패트릭스 페스티벌 더블린 2026: 퍼레이드 경로, 관람 포인트, 그리고 4일 일정',
    body: `# 세인트 패트릭스 페스티벌 더블린 2026: 퍼레이드 경로, 관람 포인트, 그리고 4일 일정

세인트 패트릭스 데이에 맞춰 더블린 여행을 계획하고 있다면, 2026년의 핵심은 이 축제가 하루짜리 행사가 아니라는 점입니다. 공식 세인트 패트릭스 페스티벌은 **2026년 3월 14일부터 17일까지**, 총 4일 동안 진행됩니다. 즉, 여행의 초점을 퍼레이드 하루에만 맞출 필요가 없고, 도시 전역에서 이어지는 공식 행사까지 함께 엮어 3박 4일 또는 4박 5일에 가까운 도시 여행으로 만들 수 있습니다.

가장 큰 하이라이트는 여전히 **내셔널 세인트 패트릭스 데이 퍼레이드**입니다. 공식 시작 시간은 **3월 17일 정오 12시**, 장소는 더블린 시내 중심부입니다. 실제로 여행자가 가장 먼저 정해야 하는 것도 비슷합니다. 퍼레이드 당일에 무료 길가 관람을 할지, 제한 수량의 유료 그랜드스탠드 좌석을 살지, 그리고 그 결정을 4일짜리 전체 축제 일정과 어떻게 연결할지입니다.

## 먼저 알아둘 것

- **축제 기간은 확정되었습니다.** 세인트 패트릭스 페스티벌 더블린 2026은 **3월 14일부터 17일까지** 열립니다.
- **퍼레이드 시간도 확정되었습니다.** 내셔널 세인트 패트릭스 데이 퍼레이드는 **3월 17일 정오 12시**에 시작합니다.
- **경로도 확정되었습니다.** 퍼레이드는 **Parnell Square**에서 출발해 **O'Connell Street**를 따라 내려오고, **O'Connell Bridge**를 지나 **Cuffe Street와 Kevin Street 교차점** 부근에서 마무리됩니다.
- **길가 관람에는 별도 티켓이 필요하지 않습니다.** 공식 안내에 따르면 경로를 따라 서서 무료로 볼 수 있습니다.
- **그랜드스탠드 좌석은 별도 판매입니다.** 예약된 좌석이 필요한 사람을 위해 제한된 수량만 따로 판매됩니다.
- **축제는 퍼레이드 한 번으로 끝나지 않습니다.** 공식 프로그램은 3월 14일부터 17일까지 가족형 행사와 도심 전역의 이벤트가 이어진다고 설명합니다.

![더블린에서 열린 세인트 패트릭스 데이 퍼레이드](https://commons.wikimedia.org/wiki/Special:FilePath/St._Patrick%27s_Day_Parade_In_Dublin_-_March_2011_%285534408947%29.jpg)
*이미지 출처: Wikimedia Commons*

## 날짜와 확인된 내용

여행 계획에서 가장 먼저 고정할 수 있는 사실은 날짜입니다. 공식 축제 사이트는 2026년 페스티벌이 **3월 14일부터 17일까지** 열린다고 밝히고 있습니다. 이 정보만으로도 더블린을 하룻밤 스쳐 가는 도시가 아니라, 여러 날 머물며 축제 분위기를 경험할 수 있는 목적지로 볼 이유가 생깁니다.

공식 퍼레이드 페이지는 **3월 17일 정오 12시** 시작을 확인합니다. 이 페이지가 함께 제공하는 핵심 정보는 다음과 같습니다.

- 출발 지점: **Parnell Square**
- 주요 구간: **O'Connell Street**
- 강을 건너는 구간: **O'Connell Bridge**
- 종료 지점: **Cuffe Street와 Kevin Street 교차점** 인근

같은 페이지는 관람 방식에 대해서도 중요한 사실을 분명히 합니다. 첫째, **경로를 따라 보는 일반 관람에는 별도 티켓이 필요하지 않습니다.** 둘째, **유료 그랜드스탠드 좌석은 제한 수량으로 따로 판매됩니다.** 즉, 더블린에서 세인트 패트릭스 퍼레이드를 보는 방식은 크게 무료 길가 관람과 유료 좌석 관람으로 나뉩니다.

또한 공식 퍼레이드 페이지는 2026년 행사가 **12대의 대형 플로트**와 **3,000명 이상의 참가자**로 구성된다고 안내합니다. 이것은 왜 도심 전체가 큰 공개 행사처럼 움직이는지, 그리고 왜 미리 어느 구간에서 볼지 정하는 것이 유용한지를 설명해 줍니다.

## 사람들이 찾는 이유와 대표 경험

이 축제를 위해 더블린에 가는 이유는 단순히 3월 17일 하루의 거리 분위기 때문만은 아닙니다. 공식 정보가 보여 주는 대표 경험은 더 넓습니다. 즉, **퍼레이드 당일의 상징적인 장면**과 **그 전후 며칠 동안 도시 전역에 퍼지는 공식 프로그램**을 함께 묶어 보는 것입니다.

대표 장면은 물론 퍼레이드입니다. 대형 플로트와 수천 명의 참가자가 도심 한복판을 지나가는 구조이기 때문에, 단순한 지역 행렬이 아니라 도시 차원의 공개 연출로 작동합니다. 처음 가는 사람이라면 이 퍼레이드만으로도 3월 17일을 중심에 둔 일정이 충분히 설득력을 가집니다.

하지만 4일 일정이 가치 있는 이유는 퍼레이드 외의 축제 시간 때문입니다. 공식 프로그램은 **가족 친화형 행사**와 **도시 전역의 이벤트**가 여러 날 이어진다고 밝힙니다. 그래서 더블린 여행을 퍼레이드 하루만 보고 끝내기보다, 최소 3일 이상 머물며 축제 전체 리듬을 경험하는 편이 훨씬 자연스럽습니다.

## 어디에서 볼지, 어떻게 고를지

### 1. 무료 길가 관람

가장 유연한 방식은 길가에서 보는 무료 관람입니다. 공식 퍼레이드 페이지는 경로를 따라 서서 보는 데 **추가 티켓이 필요 없다고** 설명합니다.

이 방식은 다음과 같은 여행자에게 잘 맞습니다.

- 비용을 낮추고 싶다
- 고정 좌석보다 이동성을 원한다
- 퍼레이드 전후로 더블린 시내를 걸으며 움직이고 싶다
- 특정 좌석보다 경로의 한 구간을 고르는 방식이 더 편하다

### 2. 유료 그랜드스탠드 좌석

공식 안내는 한정 수량의 **그랜드스탠드 좌석을 별도 판매**한다고 밝힙니다. 이 방식은 반드시 필요한 것은 아니지만, 자리를 미리 확보하고 싶은 사람에게는 의미가 있습니다.

이 방식은 다음과 같은 여행자에게 더 맞을 수 있습니다.

- 당일 동선보다 좌석 확정을 우선한다
- 길가에서 오래 서 있는 방식보다 정해진 관람 구성이 좋다
- 퍼레이드 당일 계획을 더 구조적으로 짜고 싶다

### 3. 어느 구간을 고를까

비공식 팁보다 안전한 기준은 **공식 경로 지리**를 바탕으로 고르는 것입니다.

- **Parnell Square**: 출발 분위기를 보고 싶을 때
- **O'Connell Street**: 가장 중심적인 도심 구간 중 하나를 원할 때
- **O'Connell Bridge**: 강을 건너는 상징적인 흐름을 포함해 보고 싶을 때
- **Cuffe Street와 Kevin Street 교차점 부근**: 끝나는 쪽에 맞춰 하루를 짜고 싶을 때

가장 중요한 것은 마지막 순간에 이리저리 옮겨 다니지 않도록, 미리 한 구간을 정해 두는 것입니다.

## 현실적인 3일 또는 4일 일정

### 가장 균형 잡힌 4일 일정: 3월 14일~17일

**1일차, 3월 14일 토요일**  
더블린에 도착해 중심부 동선을 익히고, 공식 프로그램에서 어떤 행사들이 열리는지 먼저 확인합니다. 퍼레이드만 기다리기보다 축제 전체에 천천히 들어가는 날로 쓰는 편이 좋습니다.

**2일차, 3월 15일 일요일**  
도시 전역 행사에 초점을 맞춥니다. 이 날은 퍼레이드가 아닌 축제 전체 분위기를 경험하는 날로 보고, 너무 빡빡하게 채우기보다 여유 있게 움직이는 편이 더 낫습니다.

**3일차, 3월 16일 월요일**  
퍼레이드 전날입니다. 무료 관람을 할지, 좌석을 예약할지 최종 결정하고, 어느 구간에서 볼지 확정합니다. 17일 일정을 단순하게 만들기 위한 준비일이라고 생각하면 됩니다.

**4일차, 3월 17일 화요일**  
퍼레이드 당일입니다. 정오 12시 시작이므로, 오전에는 선택한 관람 구역으로 이동하고 동선을 단순하게 유지하는 것이 좋습니다. 핵심은 다른 일정을 많이 넣지 않고 퍼레이드를 중심에 두는 것입니다.

### 더 짧은 3일 일정: 3월 15일~17일

4일을 모두 쓰기 어렵다면 가장 실용적인 압축 버전은 다음과 같습니다.

- **3월 15일**: 도착 후 공식 프로그램 행사 참여
- **3월 16일**: 시내 축제 분위기 경험 + 퍼레이드 준비
- **3월 17일**: 정오 퍼레이드 관람

이렇게 하면 퍼레이드만 보고 바로 떠나는 일정보다 훨씬 자연스럽게 더블린 축제를 경험할 수 있습니다.

## 먼저 예약할 것

이 축제에서 가장 먼저 정해야 할 것은 복잡한 입장권이 아니라 **여행 구조 자체**입니다.

- **여행 날짜**: 3월 14일~17일 전체를 쓸지, 15일~17일처럼 줄일지
- **그랜드스탠드 좌석 여부**: 공식 안내상 제한 수량만 별도 판매되므로, 좌석 관람이 중요하면 먼저 확인해야 합니다

무료 길가 관람을 선택한다면 퍼레이드 관람 자체를 위해 따로 티켓을 살 필요는 없습니다. 그래서 대부분의 여행자에게는 좌석을 살지 말지가 사실상 유일한 큰 예약 판단입니다.

## 이동과 인파 전략

퍼레이드는 더블린 중심부를 가로지릅니다. 공식 경로만 봐도 핵심 전략은 분명합니다. **퍼레이드 당일에는 도심을 여러 번 가로지르려 하지 말고, 한 구간 중심으로 움직여야 합니다.**

실용적인 방식은 다음과 같습니다.

- 3월 17일 전에 미리 관람 구역을 정한다
- 퍼레이드 당일에는 그 한 구역을 중심으로 하루를 짠다
- 정오 시작 전후로는 다른 일정이나 약속을 촘촘하게 넣지 않는다
- 3월 14일~16일에는 도시 이동과 프로그램 탐색을 하고, 17일은 최대한 단순하게 둔다

이 축제는 도심형 대형 행사이므로, 무리하게 여러 포인트를 한 번에 잡으려는 계획보다 단순한 계획이 더 좋은 결과를 만듭니다.

## 실용적인 에티켓과 주의점

공식 자료가 운영 규칙 전부를 세세하게 설명하는 것은 아니므로, 가장 안전한 태도는 다음과 같습니다.

- 공식 축제 사이트와 공식 퍼레이드 페이지를 먼저 확인하기
- 좌석 예약 없이 그랜드스탠드 접근이 가능하다고 가정하지 않기
- 축제를 퍼레이드 하루만으로 축소해서 생각하지 않기
- 도심 혼잡은 충분히 현실적으로 예상하기
- 무료 길가 관람인지, 유료 좌석 관람인지 한 가지 방식을 일찍 정하고 밀고 가기

## 출발 전 다시 확인할 것

- 축제 기간: **2026년 3월 14일~17일**
- 퍼레이드 시작 시각: **3월 17일 정오 12시**
- 공식 경로: **Parnell Square**, **O'Connell Street**, **O'Connell Bridge**, **Cuffe Street와 Kevin Street 교차점 부근**
- 무료 길가 관람으로 볼지, 유료 그랜드스탠드를 살지
- 4일 전체 공식 프로그램 중 퍼레이드 외에 무엇을 넣을지

## 출처

- [St. Patrick's Festival Dublin - 세인트 패트릭스 데이 퍼레이드](https://stpatricksfestival.ie/st-patricks-day-parade/)
- [St. Patrick's Festival Dublin - 공식 홈페이지](https://stpatricksfestival.ie/)`,
  },
  'st-patricks-festival-dublin-2026-guide-2026-02-19::zh': {
    title: '都柏林圣帕特里克节 2026：游行路线、观看区域与四日行程',
    body: `# 都柏林圣帕特里克节 2026：游行路线、观看区域与四日行程

如果你打算围绕圣帕特里克节去都柏林，2026 年最关键的信息是：这不是只围绕一天游行展开的活动。官方的 **St. Patrick's Festival** 将从 **2026 年 3 月 14 日持续到 3 月 17 日**，共四天。也就是说，你可以把这趟旅行规划成一段完整的节庆城市假期，而不只是为了 3 月 17 日中午那一场游行匆匆来回。

当然，最受关注的核心活动仍然是 **National St. Patrick's Day Parade**。官方开始时间为 **3 月 17 日中午 12 点**，地点在都柏林市中心。对大多数第一次去的人来说，真正需要先做出的决定通常不是“去不去”，而是“怎么去看”：是在沿线免费站位观看，还是另外购买数量有限的看台座位，然后再把其余几天的城市安排围绕这一选择来展开。

## 先了解这些

- **节期已经确认。** 2026 年都柏林圣帕特里克节将于 **3 月 14 日至 17 日**举行。
- **游行时间已经确认。** 国家圣帕特里克节游行将于 **3 月 17 日中午 12 点**开始。
- **路线已经确认。** 游行从 **Parnell Square** 出发，沿 **O'Connell Street** 前进，经过 **O'Connell Bridge**，在 **Cuffe Street 与 Kevin Street 交界处**附近结束。
- **沿线观看不需要额外门票。** 官方说明明确表示，沿游行路线可免费观看。
- **看台座位需另外购买。** 如果你希望有预留座位，可以选择数量有限、单独出售的看台席位。
- **节庆不只是一下午。** 官方节目确认，3 月 14 日至 17 日期间会有面向家庭的活动和覆盖全城的节庆内容。

![都柏林圣帕特里克节游行](https://commons.wikimedia.org/wiki/Special:FilePath/St._Patrick%27s_Day_Parade_In_Dublin_-_March_2011_%285534408947%29.jpg)
*图片来源：Wikimedia Commons*

## 日期与已确认信息

对行程规划来说，最重要的是先把已经确定的部分抓稳。官方节庆网站确认，2026 年的 **St. Patrick's Festival** 从 **3 月 14 日到 3 月 17 日**举行。这给了旅行者一个非常清晰的四天窗口，也说明这座城市在节日期间并不是只有游行当天才值得去。

官方游行页面则确认了最关键的游行信息：

- 开始时间：**3 月 17 日中午 12 点**
- 起点：**Parnell Square**
- 主要路段：**O'Connell Street**
- 途经桥梁：**O'Connell Bridge**
- 结束区域：**Cuffe Street 与 Kevin Street 交界处**附近

同一页面也确认了两项对游客尤其重要的事实。第一，**沿游行路线观看不需要门票**；第二，**看台座位会单独出售，而且数量有限**。这意味着你不需要把这次行程理解成一个必须抢票才能参与的活动，但如果你偏好更固定的观赏方式，仍然可以提前安排座位。

官方页面还说明，2026 年游行将包含 **12 辆大型花车**和 **超过 3,000 名参与者**。这不仅解释了为什么它会成为都柏林市中心最受关注的节庆时刻，也提醒旅行者：这是一场真正的大型公共活动，提前决定观看方式很有价值。

## 为什么人们会去，以及最具代表性的体验

很多人会为了圣帕特里克节来到都柏林，是因为这里提供的并不只是一个“看完游行就结束”的城市打卡体验。更典型的感受是：在 3 月 17 日这一天看到最具象征性的街头场面，同时在前后几天持续感受整座城市的官方节庆氛围。

游行之所以是标志性体验，在于它把固定路线、城市中心空间和大规模官方制作结合在一起。**12 辆大型花车**与 **3,000 多名参与者**意味着它不是一场小型地方巡游，而是一次真正意义上的城市级公开庆典。

但如果你有三四天时间停留，这座城市的吸引力并不只来自游行本身。官方节目明确说明，从 3 月 14 日到 17 日，都会有家庭向活动和城市范围内的节庆项目。对第一次去的人来说，这一点非常重要，因为它让这趟旅行不必只押在几个小时的游行窗口上。

## 在哪里看，以及怎么选更合适

### 1. 免费沿线观看

如果你更重视灵活性，最直接的方式就是沿路线免费观看。官方页面明确说，不需要额外门票就能在沿线站位观看。

这种方式通常更适合以下几类旅行者：

- 想控制预算
- 希望当天保持机动性
- 想把游行与市中心步行行程结合起来
- 不需要固定座位，只想提前选定一个大致路段

### 2. 付费看台座位

另一种方式是购买数量有限的看台座位。它不是参加活动的必要条件，但如果你更喜欢更稳定、更有结构的观游体验，这会是更合适的选择。

这种方式通常更适合以下情况：

- 你希望事先把观看位置确定下来
- 你不想在当天临时寻找站位
- 你更愿意围绕一个固定观赏点来安排整天节奏

### 3. 该选哪一段路线

最稳妥的方法不是去追逐非官方“最佳机位”传闻，而是根据已经确认的路线来选。

- **Parnell Square**：适合想体验起点氛围的人
- **O'Connell Street**：适合想待在最核心市中心段的人
- **O'Connell Bridge**：适合想把跨河段也纳入体验的人
- **Cuffe Street 与 Kevin Street 交界处附近**：适合想把落点放在路线后段的人

无论你选哪一段，最好都在出发前就决定下来。对于一个在城市中心举行的大型游行来说，最后一刻再边走边换点位，通常只会让体验更混乱。

## 现实可行的三日或四日行程

### 更完整的四日方案：3 月 14 日至 17 日

**第 1 天，3 月 14 日，周六**  
抵达都柏林，先熟悉市中心动线，并查看官方节庆项目。不要把这一天当成“等待游行的空档”，而是把它当成进入节庆节奏的开始。

**第 2 天，3 月 15 日，周日**  
把重点放在游行之外的城市节庆活动上。官方节目既然明确说明节庆覆盖四天，那么这一天就很适合作为“感受城市整体氛围”的日子。

**第 3 天，3 月 16 日，周一**  
把这一天当作游行前的准备日。确定你到底是免费沿线看，还是要购买看台座位；同时把自己打算停留的路线区段也提前选定。

**第 4 天，3 月 17 日，周二**  
这是游行日。因为官方开始时间是 **中午 12 点**，所以最实际的做法是把当天行程尽量简化，围绕游行这一件事安排即可。

### 更紧凑的三日方案：3 月 15 日至 17 日

如果你无法完整待满四天，更实用的压缩版通常是：

- **3 月 15 日**：抵达并从官方节庆项目开始
- **3 月 16 日**：城市节庆体验 + 游行准备
- **3 月 17 日**：观看中午 12 点开始的游行

这样仍然能避免把整趟旅程压缩成“只看游行半天”的仓促打法。

## 最应该先订什么

这类节庆最先要决定的，通常不是一长串门票，而是你的旅行结构本身。

- **先确定旅行日期**：是完整的 3 月 14 日至 17 日，还是缩短为 15 日至 17 日
- **再决定是否购买看台座位**：因为官方说明这类座位数量有限，若你真的需要固定席位，应优先处理这一项

如果你接受沿线免费观看，那么看游行本身并不需要另买入场票。这也是这场活动对大多数旅行者最友好的地方之一。

## 交通与人流策略

游行路线横穿都柏林市中心，因此最实用的原则非常简单：**在游行当天，不要试图把整座城都跑一遍。**

更好的做法是：

- 在 3 月 17 日之前就选定你的观看区段
- 把当天主要活动集中在那一个区域
- 不要在中午前后安排过多需要精确踩点的其他行程
- 把更大的城市探索留给 3 月 14 日至 16 日

这种大城市中心节庆，通常不是“安排越多越值”，而是“安排越简单越稳”。

## 实用礼仪与注意事项

官方资料并没有覆盖所有细枝末节的现场规则，因此更可靠的做法是遵循几条稳妥原则：

- 优先查看官方节庆网站和官方游行页面
- 不要在没有预订的情况下默认自己可以进入看台区域
- 不要把这场节庆误解成只有游行那几个小时
- 对市中心拥挤程度保持现实预期
- 尽早决定自己是沿线免费观看，还是选择付费看台

## 出发前还要再确认什么

- 节庆日期：**2026 年 3 月 14 日至 17 日**
- 游行开始时间：**3 月 17 日中午 12 点**
- 官方路线：**Parnell Square、O'Connell Street、O'Connell Bridge、Cuffe Street 与 Kevin Street 交界处附近**
- 你是打算免费沿线观看，还是购买看台座位
- 四天官方节目里有哪些内容值得加入到游行之外的行程中

## 资料来源

- [St. Patrick's Festival Dublin - 圣帕特里克节游行](https://stpatricksfestival.ie/st-patricks-day-parade/)
- [St. Patrick's Festival Dublin - 官方主页](https://stpatricksfestival.ie/)`,
  },
  'st-patricks-festival-dublin-2026-guide-2026-02-19::fr': {
    title:
      'Festival de la Saint-Patrick à Dublin 2026 : parcours du défilé, points de vue et programme sur quatre jours',
    body: `# Festival de la Saint-Patrick à Dublin 2026 : parcours du défilé, points de vue et programme sur quatre jours

Si vous envisagez un voyage à Dublin autour de la Saint-Patrick, le point essentiel pour 2026 est que l’événement officiel ne se limite pas à une seule journée. Le **St. Patrick's Festival** se déroulera du **14 au 17 mars 2026**, soit quatre jours complets. Cela change la manière de préparer le séjour : au lieu de ne penser qu’au défilé du 17 mars, vous pouvez organiser une vraie escapade urbaine rythmée par plusieurs jours d’animations officielles.

L’événement central reste bien sûr le **National St. Patrick's Day Parade**, dont le départ officiel est fixé à **12 h le 17 mars** dans le centre-ville de Dublin. Pour la plupart des visiteurs, la vraie décision pratique consiste alors à choisir comment assister au défilé : gratuitement depuis la rue, ou via une place en tribune vendue séparément et en nombre limité, puis à construire le reste du voyage autour de ce choix.

## Ce qu’il faut savoir d’abord

- **Les dates du festival sont confirmées.** L’édition 2026 se déroule du **14 au 17 mars**.
- **L’horaire du défilé est confirmé.** Le **National St. Patrick's Day Parade** commence à **12 h le 17 mars**.
- **L’itinéraire est confirmé.** Le défilé part de **Parnell Square**, descend **O'Connell Street**, traverse **O'Connell Bridge** et se termine près du **croisement de Cuffe Street et Kevin Street**.
- **Aucun billet n’est requis** pour assister au défilé depuis le bord de la rue.
- **Les places en tribune sont vendues séparément** et en quantité limitée pour les personnes qui veulent un emplacement réservé.
- **Le festival est plus large qu’un simple après-midi de défilé.** Le programme officiel confirme quatre jours d’événements, avec des activités familiales et des animations réparties dans la ville.

![Défilé de la Saint-Patrick à Dublin](https://commons.wikimedia.org/wiki/Special:FilePath/St._Patrick%27s_Day_Parade_In_Dublin_-_March_2011_%285534408947%29.jpg)
*Source de l'image : Wikimedia Commons*

## Dates et éléments confirmés

Le premier point stable pour préparer le voyage, ce sont les dates. Le site officiel du festival confirme que l’édition 2026 se tient du **14 au 17 mars**. Cela donne une fenêtre claire de quatre jours pour un long week-end ou une courte escapade, et cela montre que Dublin ne se résume pas à la seule journée du 17 mars.

La page officielle du défilé confirme ensuite les informations les plus utiles pour les visiteurs :

- départ à **12 h le 17 mars**
- départ de **Parnell Square**
- passage par **O'Connell Street**
- traversée de **O'Connell Bridge**
- arrivée dans la zone du **croisement de Cuffe Street et Kevin Street**

La même page confirme aussi deux éléments très concrets. D’une part, **il n’est pas nécessaire d’acheter un billet pour regarder le défilé le long de l’itinéraire**. D’autre part, **des places en tribune sont vendues séparément, en nombre limité**. En pratique, cela veut dire que le défilé est accessible sans billet obligatoire, mais que les voyageurs qui veulent une place réservée peuvent opter pour une solution payante.

La page officielle indique également l’ampleur de l’édition 2026 : **12 chars de grande taille** et **plus de 3 000 participants**. Cette information donne une bonne idée de la dimension de l’événement au cœur du centre-ville.

## Pourquoi les gens viennent et quelle est l’expérience emblématique

Les visiteurs viennent à Dublin pour la Saint-Patrick non seulement pour le défilé, mais parce que la ville entière prend un rythme particulier pendant plusieurs jours. L’expérience emblématique consiste à voir le grand défilé du 17 mars, tout en profitant de l’énergie festive qui s’étend avant et après ce moment principal.

Le défilé reste la pièce maîtresse parce qu’il associe un itinéraire fixe au centre de la ville et une production officielle d’envergure. Avec **12 chars** et **plus de 3 000 participants**, il s’agit clairement d’un grand événement public, et non d’une simple petite procession locale.

Mais pour un séjour de trois ou quatre jours, le programme officiel compte tout autant. Il confirme des **activités familiales** et des **événements dans toute la ville** du 14 au 17 mars. Pour un premier voyage, c’est ce qui rend un séjour plus long particulièrement pertinent : on ne dépend pas uniquement d’un seul créneau horaire pour justifier le déplacement.

## Où regarder et comment choisir

### 1. L’observation gratuite depuis la rue

L’option la plus souple consiste à regarder le défilé depuis l’itinéraire, gratuitement. La page officielle précise clairement qu’aucun billet n’est requis pour cela.

Cette solution convient bien si vous voulez :

- limiter les coûts
- rester mobile le jour du défilé
- combiner l’événement avec une promenade dans le centre-ville
- choisir un secteur général plutôt qu’un siège fixe

### 2. Les tribunes payantes

L’autre option consiste à acheter une place en tribune. Ce n’est pas obligatoire, mais cela peut être utile si vous préférez une journée plus structurée et un point de vue réservé à l’avance.

Cette option peut mieux convenir si vous voulez :

- un emplacement confirmé
- moins d’incertitude au moment du défilé
- construire toute la journée autour d’un point d’observation défini

### 3. Comment choisir une section du parcours

Le choix le plus sûr consiste à s’appuyer sur la **géographie confirmée de l’itinéraire**, et non sur des rumeurs de “meilleurs spots”.

- **Parnell Square** convient si vous voulez être près du départ
- **O'Connell Street** est l’un des tronçons les plus centraux et les plus évidents
- **O'Connell Bridge** permet d’inclure la traversée au cœur de la ville
- La zone de **Cuffe Street et Kevin Street** convient si vous préférez vous placer vers la fin du parcours

Quel que soit le secteur choisi, mieux vaut décider à l’avance et éviter d’improviser au dernier moment.

## Un programme réaliste sur 3 ou 4 jours

### Le format le plus équilibré : 4 jours, du 14 au 17 mars

**Jour 1, samedi 14 mars**  
Arrivée à Dublin, installation, repérage du centre-ville et lecture du programme officiel. Il vaut mieux considérer cette journée comme l’entrée progressive dans le festival, plutôt que comme un simple temps d’attente avant le défilé.

**Jour 2, dimanche 15 mars**  
Journée consacrée aux événements du festival au-delà du défilé. C’est le bon moment pour profiter des animations réparties dans la ville et du rythme plus large du festival.

**Jour 3, lundi 16 mars**  
Journée de préparation du défilé. Finalisez votre choix entre observation gratuite et tribune payante, et décidez du secteur où vous comptez vous placer.

**Jour 4, mardi 17 mars**  
Journée du défilé. Comme le départ officiel est fixé à **12 h**, le plus pratique est de garder une journée simple, organisée autour du défilé lui-même.

### Version plus courte : 3 jours, du 15 au 17 mars

Si vous ne pouvez pas rester quatre jours, la version la plus logique est généralement :

- **15 mars** : arrivée et premiers événements officiels
- **16 mars** : ambiance du festival en ville + préparation du défilé
- **17 mars** : journée du défilé à midi

## Que réserver en priorité

Pour ce type de festival, l’essentiel n’est pas une longue liste de billets, mais la structure du voyage.

- **Les dates du séjour** : tout le festival du 14 au 17 mars, ou une version plus courte
- **Les tribunes si elles vous importent vraiment** : comme les places sont limitées et vendues séparément, c’est le seul vrai point de réservation à traiter tôt

Si l’observation gratuite depuis la rue vous convient, il n’y a pas de billet obligatoire à acheter pour voir le défilé.

## Transport et stratégie face à l’affluence

Le défilé traverse le cœur du centre-ville de Dublin. La leçon la plus utile est donc simple : **le jour du défilé, n’essayez pas de couvrir trop de terrain.**

Une stratégie réaliste consiste à :

- choisir votre secteur avant le 17 mars
- organiser la journée autour de ce seul secteur
- éviter les correspondances trop serrées autour de midi
- garder les journées du 14 au 16 mars pour les déplacements plus larges dans la ville

Pour une grande manifestation urbaine, un plan simple vaut presque toujours mieux qu’un programme trop ambitieux.

## Conseils pratiques et précautions

Les sources officielles ne détaillent pas toutes les règles de terrain, donc les conseils les plus sûrs restent les plus sobres :

- privilégier les informations du site officiel et de la page officielle du défilé
- ne pas supposer un accès en tribune sans réservation
- ne pas réduire le festival à la seule journée du défilé
- garder des attentes réalistes sur l’affluence au centre-ville
- choisir tôt entre observation gratuite et tribune payante

## Ce qu’il faut revérifier avant de partir

- les dates du festival : **14 au 17 mars 2026**
- l’horaire de départ du défilé : **12 h le 17 mars**
- l’itinéraire officiel : **Parnell Square, O'Connell Street, O'Connell Bridge, Cuffe Street / Kevin Street**
- votre choix entre observation gratuite et tribune payante
- le programme officiel complet si vous voulez profiter d’autre chose que du seul défilé

## Sources

- [St. Patrick's Festival Dublin - défilé de la Saint-Patrick](https://stpatricksfestival.ie/st-patricks-day-parade/)
- [St. Patrick's Festival Dublin - site officiel](https://stpatricksfestival.ie/)`,
  },
  'st-patricks-festival-dublin-2026-guide-2026-02-19::vi': {
    title:
      'Lễ hội St. Patrick ở Dublin 2026: lộ trình diễu hành, điểm xem đẹp và kế hoạch 4 ngày',
    body: `# Lễ hội St. Patrick ở Dublin 2026: lộ trình diễu hành, điểm xem đẹp và kế hoạch 4 ngày

Nếu bạn đang lên kế hoạch đến Dublin vào dịp St. Patrick's Day, điều quan trọng nhất của năm 2026 là lễ hội chính thức không chỉ gói gọn trong một buổi chiều diễu hành. **St. Patrick's Festival** sẽ diễn ra từ **ngày 14 đến ngày 17 tháng 3 năm 2026**, tức kéo dài trọn bốn ngày. Điều đó có nghĩa là bạn có thể xây dựng cả chuyến city break xoay quanh nhịp lễ hội của thành phố, thay vì chỉ bay đến để xem một cuộc diễu hành rồi rời đi.

Điểm nhấn lớn nhất dĩ nhiên vẫn là **National St. Patrick's Day Parade**, chính thức bắt đầu lúc **12 giờ trưa ngày 17 tháng 3** ở trung tâm Dublin. Với phần lớn du khách, câu hỏi thực tế nhất không phải là “có nên đi hay không”, mà là “nên xem bằng cách nào”: đứng xem miễn phí dọc tuyến diễu hành hay mua một trong số ít ghế khán đài bán riêng, rồi sắp xếp phần còn lại của chuyến đi dựa trên lựa chọn đó.

## Điều cần biết trước

- **Ngày diễn ra lễ hội đã được xác nhận.** Lễ hội kéo dài từ **14 đến 17 tháng 3 năm 2026**.
- **Thời gian diễu hành đã được xác nhận.** **National St. Patrick's Day Parade** bắt đầu lúc **12 giờ trưa ngày 17 tháng 3**.
- **Lộ trình đã được xác nhận.** Đoàn diễu hành xuất phát từ **Parnell Square**, đi dọc **O'Connell Street**, qua **O'Connell Bridge** và kết thúc gần **ngã giao Cuffe Street và Kevin Street**.
- **Xem dọc tuyến đường không cần vé riêng.** Theo thông tin chính thức, bạn có thể đứng xem miễn phí ở các đoạn trên tuyến diễu hành.
- **Ghế khán đài được bán riêng.** Đây là lựa chọn dành cho người muốn có chỗ ngồi cố định, nhưng số lượng có hạn.
- **Lễ hội không chỉ có một buổi diễu hành.** Chương trình chính thức xác nhận bốn ngày hoạt động, gồm các sự kiện phù hợp cho gia đình và nhiều hoạt động trải khắp thành phố.

![Cuộc diễu hành ngày St. Patrick tại Dublin](https://commons.wikimedia.org/wiki/Special:FilePath/St._Patrick%27s_Day_Parade_In_Dublin_-_March_2011_%285534408947%29.jpg)
*Nguồn ảnh: Wikimedia Commons*

## Ngày diễn ra và những gì đã được xác nhận

Điểm chắc chắn nhất để bắt đầu lập kế hoạch là mốc thời gian. Trang chính thức của lễ hội xác nhận rằng **St. Patrick's Festival 2026** diễn ra từ **14 đến 17 tháng 3**. Chỉ riêng thông tin đó cũng đủ cho thấy Dublin đáng để ở lại nhiều ngày, chứ không chỉ ghé qua trong đúng ngày 17 tháng 3.

Trang chính thức của cuộc diễu hành xác nhận những thông tin thực tế quan trọng nhất:

- giờ bắt đầu: **12 giờ trưa ngày 17 tháng 3**
- điểm xuất phát: **Parnell Square**
- trục đường chính: **O'Connell Street**
- đoạn qua cầu: **O'Connell Bridge**
- khu vực kết thúc: gần **ngã giao Cuffe Street và Kevin Street**

Trang này cũng xác nhận hai điều rất hữu ích cho khách du lịch. Thứ nhất, **không cần mua vé riêng để đứng xem dọc tuyến đường**. Thứ hai, **ghế khán đài được bán riêng và số lượng có hạn**. Nói cách khác, đây không phải là một sự kiện mà bạn bắt buộc phải có vé mới tham gia được; nhưng nếu muốn có chỗ ngồi cố định, bạn vẫn có thể chọn phương án trả phí.

Thông tin chính thức còn cho biết quy mô của lễ diễu hành 2026 gồm **12 xe hoa cỡ lớn** và **hơn 3.000 người tham gia**. Điều này cho thấy đây là một sự kiện công cộng rất lớn ở trung tâm thành phố, không phải một đoàn diễu hành nhỏ kiểu địa phương.

## Vì sao mọi người đến và trải nghiệm tiêu biểu là gì

Mọi người đến Dublin vào dịp này không chỉ để xem một cuộc diễu hành. Trải nghiệm mang tính biểu tượng hơn là được ở trong thành phố đúng vào ngày 17 tháng 3, đồng thời cảm nhận không khí lễ hội kéo dài nhiều ngày trước và sau thời điểm cao trào đó.

Cuộc diễu hành là trung tâm của trải nghiệm, vì nó kết hợp lộ trình cố định qua trung tâm thành phố với quy mô tổ chức lớn. Với **12 xe hoa lớn** và **hơn 3.000 người tham gia**, đây rõ ràng là một sự kiện công cộng tầm cỡ.

Nhưng nếu bạn ở lại ba hoặc bốn ngày, giá trị của chuyến đi không chỉ nằm ở vài giờ diễu hành. Chương trình chính thức xác nhận có các hoạt động dành cho gia đình và nhiều sự kiện trên toàn thành phố trong suốt bốn ngày. Với người đi lần đầu, đó là lý do rất thuyết phục để dành nhiều thời gian hơn cho Dublin.

## Nên đứng ở đâu và chọn cách xem như thế nào

### 1. Xem miễn phí dọc tuyến đường

Đây là lựa chọn linh hoạt nhất. Trang chính thức nêu rõ rằng bạn không cần mua vé riêng để đứng xem dọc lộ trình.

Cách này phù hợp nếu bạn muốn:

- tiết kiệm chi phí
- giữ sự linh hoạt trong ngày diễu hành
- kết hợp xem diễu hành với việc đi bộ quanh trung tâm Dublin
- chọn một đoạn đường phù hợp thay vì một ghế cố định

### 2. Mua ghế khán đài

Phương án còn lại là mua ghế khán đài được bán riêng. Đây không phải lựa chọn bắt buộc, nhưng lại hợp với những ai muốn một kế hoạch chặt chẽ hơn và không phải lo tìm vị trí đứng vào phút cuối.

Lựa chọn này phù hợp hơn nếu bạn muốn:

- có vị trí xem được xác định trước
- bớt bất định trong ngày đông người
- xây dựng cả ngày diễu hành quanh một điểm ngồi cố định

### 3. Chọn đoạn nào trên lộ trình

Cách an toàn nhất là dựa vào **lộ trình đã được công bố chính thức**, thay vì chạy theo các mẹo không chính thức về “điểm đẹp nhất”.

- **Parnell Square** hợp nếu bạn muốn ở gần khu vực xuất phát
- **O'Connell Street** là một trong những đoạn trung tâm rõ ràng nhất
- **O'Connell Bridge** phù hợp nếu bạn muốn bao gồm cả đoạn qua cầu
- khu vực **Cuffe Street / Kevin Street** phù hợp nếu bạn thích đứng gần phần cuối lộ trình

Dù chọn khu nào, bạn cũng nên quyết định sớm thay vì để tới phút cuối mới đổi đi đổi lại.

## Kế hoạch 3 hoặc 4 ngày thực tế

### Phương án cân bằng nhất: 4 ngày từ 14 đến 17 tháng 3

**Ngày 1, thứ Bảy 14/3**  
Đến Dublin, nhận phòng, làm quen với trung tâm thành phố và xem chương trình chính thức. Đây là ngày để bắt đầu nhập vào nhịp lễ hội, chứ không phải chỉ chờ tới ngày diễu hành.

**Ngày 2, Chủ nhật 15/3**  
Dành cho các hoạt động lễ hội ngoài cuộc diễu hành. Đây là lúc tốt để cảm nhận bầu không khí toàn thành phố và chọn lọc các sự kiện phù hợp với mình.

**Ngày 3, thứ Hai 16/3**  
Ngày chuẩn bị cho diễu hành. Chốt việc bạn sẽ xem miễn phí dọc tuyến hay mua ghế khán đài, đồng thời chọn sẵn khu vực mình muốn đứng.

**Ngày 4, thứ Ba 17/3**  
Ngày diễu hành. Vì sự kiện bắt đầu lúc **12 giờ trưa**, tốt nhất nên giữ lịch trình đơn giản và để cuộc diễu hành là trọng tâm của cả ngày.

### Phương án ngắn hơn: 3 ngày từ 15 đến 17 tháng 3

Nếu bạn không thể ở đủ bốn ngày, lịch trình hợp lý nhất thường là:

- **15/3**: đến nơi và bắt đầu bằng các hoạt động chính thức
- **16/3**: trải nghiệm không khí lễ hội trong thành phố + chuẩn bị cho ngày diễu hành
- **17/3**: xem cuộc diễu hành lúc 12 giờ trưa

## Nên chốt gì trước tiên

Với kiểu lễ hội này, thứ cần chốt trước không phải là quá nhiều loại vé, mà là **khung chuyến đi**.

- **Ngày đi**: ở trọn 14 đến 17/3 hay chỉ rút gọn 15 đến 17/3
- **Có mua ghế khán đài hay không**: vì ghế được bán riêng và số lượng có hạn, nếu bạn thực sự muốn ngồi khán đài thì nên xử lý sớm

Nếu bạn thấy xem miễn phí dọc tuyến là đủ, thì bản thân việc xem diễu hành không đòi hỏi phải mua vé vào cửa riêng.

## Di chuyển và chiến lược trước đám đông

Lộ trình diễu hành băng qua trung tâm Dublin, vì vậy nguyên tắc thực tế nhất là: **đừng cố di chuyển quá nhiều trong ngày 17/3**.

Một kế hoạch hợp lý là:

- chọn khu vực xem trước ngày 17/3
- xây dựng cả ngày quanh khu vực đó
- tránh xếp thêm quá nhiều lịch trình chính xác vào khoảng trước và sau 12 giờ trưa
- dành các ngày 14 đến 16/3 cho việc khám phá thành phố và theo dõi chương trình lễ hội rộng hơn

Với một sự kiện lớn ngay giữa trung tâm đô thị, kế hoạch càng đơn giản thường càng hiệu quả.

## Lưu ý thực tế và phép lịch sự cơ bản

Nguồn chính thức không liệt kê hết mọi chi tiết vận hành tại hiện trường, nên cách an toàn nhất là bám vào vài nguyên tắc cơ bản:

- ưu tiên thông tin từ trang chính thức của lễ hội và trang chính thức của cuộc diễu hành
- đừng mặc định có thể vào khán đài nếu chưa đặt chỗ
- đừng coi lễ hội chỉ là vài giờ diễu hành
- hãy chuẩn bị tâm lý thực tế về mức độ đông đúc ở trung tâm thành phố
- quyết định sớm giữa việc xem miễn phí dọc tuyến và mua ghế khán đài

## Những gì nên kiểm tra lại trước khi đi

- ngày diễn ra lễ hội: **14 đến 17 tháng 3 năm 2026**
- giờ bắt đầu diễu hành: **12 giờ trưa ngày 17/3**
- lộ trình chính thức: **Parnell Square, O'Connell Street, O'Connell Bridge, Cuffe Street / Kevin Street**
- bạn muốn xem miễn phí dọc tuyến hay mua ghế khán đài
- chương trình chính thức của cả bốn ngày nếu bạn muốn làm nhiều hơn là chỉ xem diễu hành

## Nguồn tham khảo

- [St. Patrick's Festival Dublin - cuộc diễu hành ngày St. Patrick](https://stpatricksfestival.ie/st-patricks-day-parade/)
- [St. Patrick's Festival Dublin - trang chủ chính thức](https://stpatricksfestival.ie/)`,
  },
  'oktoberfest-munich-2026-guide-2026-04-03::vi': {
    title:
      'Oktoberfest Munich 2026: ngày diễn ra, chiến lược vào lều bia, đặt chỗ và cuối tuần khai mạc',
    body: `# Oktoberfest Munich 2026: ngày diễn ra, chiến lược vào lều bia, đặt chỗ và cuối tuần khai mạc

Oktoberfest 2026 tại Munich đã được xác nhận diễn ra từ **19 tháng 9 đến 4 tháng 10 năm 2026** tại **Theresienwiese**. Với người đi lần đầu, chỉ riêng thông tin này đã cho thấy hai điều: lễ hội bắt đầu vào thứ Bảy, và cuối tuần khai mạc sẽ là quãng thời gian đông nhất, được chú ý nhất, đồng thời cũng là giai đoạn đòi hỏi kế hoạch rõ ràng nhất.

Điểm thực tế quan trọng nhất là thế này: **không có vé vào cửa chung cho khuôn viên chính của Oktoberfest**, nhưng điều đó không có nghĩa là bạn có thể dễ dàng vào bất kỳ lều bia nào vào bất cứ lúc nào. Thông tin chính thức về đặt chỗ và giờ mở cửa cho thấy một số bàn vẫn dành cho khách đến tự do, nhưng buổi tối, cuối tuần và các nhóm lớn vẫn thường gặp tình trạng đóng cửa do quá tải.

## Điều cần biết trước

- **Ngày diễn ra đã được xác nhận.** Oktoberfest 2026 diễn ra từ **19 tháng 9 đến 4 tháng 10** tại **Theresienwiese**.
- **Lịch của ngày khai mạc rất quan trọng.** Vào **19 tháng 9 năm 2026**, **đoàn diễu hành của chủ lều và các nhà máy bia** bắt đầu lúc **10:35 sáng**, và thị trưởng khai mạc lễ hội lúc **12 giờ trưa** tại **lều Schottenhamel**.
- **Giờ mở lều trong ngày đầu tiên cũng đã được xác nhận.** Các lều mở cửa lúc **9 giờ sáng**; **đồ uống không cồn** có từ **10 giờ sáng**; **bia chỉ được phục vụ sau nghi thức khui thùng vào buổi trưa**.
- **Không cần vé vào cửa chung.** Bạn không phải mua một loại vé tổng nào để vào khuôn viên lễ hội.
- **Đặt chỗ có ích nhưng không giải quyết mọi thứ.** Một số chỗ vẫn để cho khách đến tự phát, nhưng **buổi tối và cuối tuần đặc biệt đông**, và nhóm lớn thường gặp khó khăn nhất khi lều quá tải.
- **Chiến lược cho người đi lần đầu là đến sớm.** Nếu muốn chuyến đi dễ chịu hơn, đừng đặt toàn bộ hy vọng vào việc đi bộ vào lều vào buổi tối cuối tuần khai mạc.

![Bên trong lều bia tại Oktoberfest ở Munich](https://commons.wikimedia.org/wiki/Special:FilePath/Oktoberfest_Munich_1978_Beer_Tent.jpg)
*Nguồn ảnh: Wikimedia Commons*

## Ngày diễn ra và những gì đã được xác nhận

Trang chính thức của Oktoberfest xác nhận rằng lễ hội năm 2026 diễn ra từ **19 tháng 9 đến 4 tháng 10** tại **Theresienwiese**, khu hội chợ truyền thống của Munich. Đây là khung thời gian cơ bản nhất để bạn chốt lịch trình.

Những thông tin có giá trị nhất cho khách lần đầu lại nằm ở **ngày khai mạc**:

- **Thứ Bảy, ngày 19 tháng 9 năm 2026** là ngày đầu tiên của lễ hội
- **Đoàn diễu hành của các chủ lều và nhà máy bia** bắt đầu lúc **10:35 sáng**
- **Thị trưởng** khai mạc chính thức lúc **12 giờ trưa** tại **lều Schottenhamel**
- **Bia chỉ được phục vụ sau nghi thức khui thùng vào buổi trưa**

Lịch trình này quyết định toàn bộ nhịp của cuối tuần khai mạc. Nếu bạn đến sớm trong buổi sáng, bạn sẽ cảm nhận được không khí dần nóng lên trước thời điểm chính thức. Nếu đến muộn hơn, bạn cần chuẩn bị cho bầu không khí đông đúc hơn rất nhiều.

Một thông tin xác nhận khác ảnh hưởng trực tiếp đến kế hoạch là: **buổi tối và cuối tuần đặc biệt đông**. Đây là điều khiến rất nhiều người đi lần đầu đánh giá sai Oktoberfest. Vào cổng miễn phí không có nghĩa là việc vào lều hay tìm chỗ ngồi lúc cao điểm sẽ dễ dàng.

## Vì sao mọi người đi và trải nghiệm tiêu biểu là gì

Với phần lớn du khách, Oktoberfest không chỉ là chuyện uống bia. Trải nghiệm tiêu biểu là được có mặt tại Theresienwiese trong một trong những lễ hội công cộng nổi tiếng nhất thế giới, chứng kiến nhịp khai mạc chính thức, rồi dành thời gian bên trong một lều bia khi không khí đã thật sự vào guồng.

Cuối tuần khai mạc đặc biệt hấp dẫn vì nó chứa phần nghi lễ rõ rệt nhất của toàn bộ lễ hội. Ngày bắt đầu bằng **đoàn diễu hành của chủ lều và các nhà máy bia**, sau đó dẫn tới **lễ khui thùng và tuyên bố khai mạc lúc 12 giờ trưa**. Với người đi lần đầu, đó là cách dễ nhất để hiểu vì sao thời điểm đến lại quan trọng hơn nhiều so với việc cố gắng “nhồi” thật nhiều hạng mục vào một ngày.

Trải nghiệm thường thấy của khách lần đầu là:

- đến sớm để cảm nhận nhịp lễ hội từ đầu ngày
- dành thời gian trong ít nhất một lều bia, dù bằng đặt chỗ trước hay chỗ ngồi không đặt trước
- chấp nhận rằng cuối tuần khai mạc là để cảm nhận bầu không khí, chứ không phải để mong mọi thứ đều thoải mái

## Chiến lược chọn lều và thời điểm

Điều hữu ích nhất cho người đi lần đầu không phải là săn “lều hoàn hảo”, mà là hiểu mối quan hệ giữa **thời điểm**, **mức độ linh hoạt** và **kỳ vọng thực tế**.

Thông tin chính thức cho biết vẫn có một phần chỗ ngồi dành cho khách đến tự do. Vì vậy, không cần nghĩ rằng đặt chỗ là con đường duy nhất. Tuy nhiên, tài liệu chính thức cũng nói rất rõ rằng **buổi tối**, **cuối tuần** và **nhóm lớn** là những tình huống khó nhất.

### Nếu bạn không có đặt chỗ

Chiến lược tốt nhất thường là:

- đến **sớm hơn** thay vì muộn
- giữ kế hoạch **linh hoạt** thay vì cứng nhắc
- đi theo **nhóm nhỏ** nếu bạn muốn dựa vào chỗ ngồi không đặt trước

Một cặp đôi hoặc nhóm nhỏ đến sớm trong ngày có cơ hội thực tế hơn nhiều so với một nhóm lớn đến vào buổi tối và hy vọng sẽ được ngồi cùng nhau.

### Nếu bạn có đặt chỗ

Đặt chỗ chủ yếu giải quyết một việc: nó cho bạn **một chỗ ngồi đã xác định trong một lều nhất định vào một khung giờ nhất định**.

Nhưng đặt chỗ **không** giải quyết được:

- sự đông đúc chung của toàn khu lễ hội
- áp lực của cuối tuần khai mạc
- việc các khu vực khác cũng có thể vẫn rất đông

Với người đi lần đầu, đây là kỳ vọng quan trọng nhất cần đặt đúng.

## Kế hoạch 3 hoặc 4 ngày thực tế

### Phương án 3 ngày cho cuối tuần khai mạc

**Ngày 1: thứ Sáu, đến Munich**  
Đến nơi, nhận phòng và giữ buổi tối nhẹ nhàng. Mục tiêu là bước vào ngày khai mạc với năng lượng tốt, thay vì cố làm quá nhiều trước khi lễ hội bắt đầu.

**Ngày 2: thứ Bảy 19/9, ngày khai mạc**  
Đây là ngày quan trọng nhất của cả chuyến đi. Hãy lấy thông tin chính thức làm khung:

- lều mở cửa lúc **9 giờ sáng**
- đồ uống không cồn có từ **10 giờ sáng**
- đoàn diễu hành bắt đầu lúc **10:35 sáng**
- thị trưởng khai mạc lúc **12 giờ trưa**
- bia được phục vụ sau nghi thức khui thùng

Với khách lần đầu, lời khuyên thực tế nhất là đến sớm và chuẩn bị tinh thần rằng càng gần buổi trưa, không khí sẽ càng đông nhanh.

**Ngày 3: Chủ nhật**  
Hãy quay lại vào ban ngày để có một lần ghé thứ hai dễ kiểm soát hơn. Buổi tối cuối tuần vẫn đông, vì vậy ban ngày thường là lựa chọn hợp lý hơn nếu bạn muốn trải nghiệm bớt áp lực.

### Phương án 4 ngày: cuối tuần khai mạc cộng thêm một ngày trong tuần

**Ngày 1: thứ Sáu**  
Đến nơi và làm quen với thành phố.

**Ngày 2: thứ Bảy**  
Tập trung vào nhịp khai mạc chính thức.

**Ngày 3: Chủ nhật**  
Quay lại lễ hội thêm một lần, nhưng vẫn giữ kỳ vọng thực tế về đám đông.

**Ngày 4: thứ Hai**  
Đây thường là ngày hữu ích nhất nếu mục tiêu của bạn là thực sự dành thời gian ở Oktoberfest mà không chịu toàn bộ sức ép của cuối tuần cao điểm.

## Nên chốt gì trước tiên

Điều quan trọng nhất cần chốt sớm là:

- **ngày đi của bạn**: cuối tuần khai mạc hay một ngày trong tuần về sau
- **bất kỳ đặt chỗ nào bạn thực sự cần**
- **giờ bạn dự định đến Theresienwiese**

Nếu chuyến đi của bạn phụ thuộc vào việc được ngồi trong lều vào một khung giờ rất đông, đặt chỗ trở nên quan trọng hơn hẳn. Nếu bạn đi hai người hoặc nhóm nhỏ và có thể đến từ sớm, bạn có thể giữ mức linh hoạt cao hơn.

## Di chuyển và chiến lược trước đám đông

Tài liệu nguồn xác nhận rõ mẫu đám đông quan trọng nhất: **buổi tối và cuối tuần đặc biệt đông**. Từ đó, chiến lược thực tế nhất khá đơn giản.

### Hãy đến sớm hơn bạn tưởng mình cần

Điều này đặc biệt đúng với:

- **ngày khai mạc**
- **chiều cuối tuần**
- **bất kỳ lần ghé nào vào buổi tối**

### Đừng xây dựng cả kế hoạch quanh một lần “đi bộ vào lều” muộn

Với nhóm lớn, điều này đặc biệt rủi ro. Nếu tài liệu chính thức đã nói rằng nhóm lớn thường gặp tình trạng đóng cửa do quá tải, bạn không nên coi việc đến muộn rồi tìm được chỗ ngồi cùng nhau là kế hoạch chính.

### Giữ kỳ vọng thực tế theo quy mô nhóm

Một cặp đôi hoặc một nhóm nhỏ thường linh hoạt hơn nhiều. Nhóm càng lớn, càng nên giảm kỳ vọng đối với những khung giờ đông nhất.

## Lưu ý thực tế và phép lịch sự cơ bản

Điều cần nhớ nhất ở Oktoberfest 2026 không phải là một quy tắc nhỏ lẻ, mà là một kỳ vọng lớn: **vào khuôn viên miễn phí không đồng nghĩa với việc mọi lều đều dễ tiếp cận vào mọi thời điểm**.

Một vài nguyên tắc đơn giản sẽ giúp chuyến đi suôn sẻ hơn:

- đừng nhầm giữa **vào được khuôn viên** và **đảm bảo có chỗ trong lều**
- đừng cho rằng đặt chỗ sẽ làm cả ngày trở nên dễ dàng
- đừng để chuyến đi của nhóm lớn phụ thuộc vào may rủi vào buổi tối cuối tuần
- hãy xem cuối tuần khai mạc là bầu không khí của một đại sự kiện, nơi đến sớm có giá trị thực tế rất lớn

## Những gì nên kiểm tra lại trước khi đi

- ngày diễn ra lễ hội: **19/9 đến 4/10/2026**
- chi tiết ngày khai mạc **19/9/2026**
- giờ bắt đầu **10:35 sáng** của đoàn diễu hành các chủ lều và nhà máy bia
- giờ mở lều trong ngày đầu tiên: **9 giờ sáng**, **10 giờ sáng** cho đồ uống không cồn, **bia sau buổi trưa**
- chuyến đi của bạn có rơi vào **cuối tuần hoặc buổi tối** hay không
- thông tin đặt chỗ mới nhất nếu bạn định đặt bàn

## Sources

- [Oktoberfest.de - official site](https://www.oktoberfest.de/en/)
- [Oktoberfest.de - Opening and tapping of the Oktoberfest 2026](https://www.oktoberfest.de/en/information/events/oktoberfest-tapping-and-opening-ceremony)
- [Oktoberfest.de - Parade of the Oktoberfest landlords and breweries](https://www.oktoberfest.de/en/information/events/parade-of-the-tent-patrons)
- [Oktoberfest.de - Beer tent opening times](https://www.oktoberfest.de/en/beer-tents/beer-tent-opening-times)
- [Oktoberfest.de - Booking at the Oktoberfest: Book a table in 2026](https://www.oktoberfest.de/en/tents/reservations-oktoberfest/booking-oktoberfest-book-table-oktoberfest)
- [Oktoberfest.de - Do you need tickets to visit the Oktoberfest or is there free entry?](https://www.oktoberfest.de/en/information/service-for-visitors/does-it-cost-money-to-go-into-oktoberfest)`,
  },
};

const REPLACEMENTS = {
  'sapporo-snow-festival-2026-travel-guide-2026-01-09::ko': [
    ['### Day 1: 도착 후 오도리 산책으로 시작하기', '### 1일차: 도착 후 오도리 산책으로 시작하기'],
    ['### Day 2: 쓰도무 + 저녁 스스키노', '### 2일차: 쓰도무 + 저녁 스스키노'],
    ['### Day 3: 마음에 든 곳 다시 보기', '### 3일차: 마음에 든 곳 다시 보기'],
    ['### Day 1: 가볍게 도착하고 짧게 오도리 살펴보기', '### 1일차: 가볍게 도착하고 짧게 오도리 살펴보기'],
    ['### Day 2: 오도리 전체 + 저녁 조명 감상', '### 2일차: 오도리 전체 + 저녁 조명 감상'],
    ['### Day 3: 쓰도무', '### 3일차: 쓰도무'],
    ['### Day 4: 스스키노와 마지막 재방문', '### 4일차: 스스키노와 마지막 재방문'],
  ],
  'sapporo-snow-festival-2026-travel-guide-2026-01-09::ja': [
    ['## Sources', '## 出典'],
  ],
  'sapporo-snow-festival-2026-travel-guide-2026-01-09::th': [
    ['### Day 1: เดินทางถึงและเดินสำรวจเบื้องต้นที่โอโดริ', '### วันที่ 1: เดินทางถึงและเดินสำรวจเบื้องต้นที่โอโดริ'],
    ['### Day 2: Tsudome และซูซูกิโนะยามเย็น', '### วันที่ 2: Tsudome และซูซูกิโนะยามเย็น'],
    ['### Day 3: กลับไปยังจุดที่ชอบ', '### วันที่ 3: กลับไปยังจุดที่ชอบ'],
    ['### Day 1: เดินทางถึงแบบเบา ๆ และสำรวจโอโดริสั้น ๆ', '### วันที่ 1: เดินทางถึงแบบเบา ๆ และสำรวจโอโดริสั้น ๆ'],
    ['### Day 2: วันเต็มที่โอโดริพร้อมเปิดไฟตอนเย็น', '### วันที่ 2: วันเต็มที่โอโดริพร้อมเปิดไฟตอนเย็น'],
    ['### Day 3: Tsudome', '### วันที่ 3: Tsudome'],
    ['### Day 4: ซูซูกิโนะและการกลับไปอีกครั้งในตอนท้าย', '### วันที่ 4: ซูซูกิโนะและการกลับไปอีกครั้งในตอนท้าย'],
  ],
  'albuquerque-balloon-fiesta-2026-guide-2026-03-21::es': [
    ['## Etiquette and practical cautions', '## Etiqueta y precauciones prácticas'],
    ['### Option 1: 3-day trip', '### Opción 1: Viaje de 3 días'],
    ['### Option 2: 4-day trip', '### Opción 2: Viaje de 4 días'],
    ['### Why Park and Ride should be central to your plan', '### Por qué Park and Ride debe ser central en tu plan'],
    ['### A practical transport approach', '### Un enfoque práctico para el transporte'],
    ['### Common planning mistake to avoid', '### Error común de planificación que conviene evitar'],
    ['## Sources', '## Fuentes'],
    ['**Day 1: Arrival day**', '**Día 1: Día de llegada**'],
    ['**Day 2: Signature sunrise session**', '**Día 2: Sesión emblemática al amanecer**'],
    ['**Day 3: Evening or specialty session, then departure**', '**Día 3: Sesión nocturna o especial y luego salida**'],
    ['**Day 1: Arrival and logistics setup**', '**Día 1: Llegada y preparación logística**'],
    ['**Day 2: First morning session**', '**Día 2: Primera sesión matutina**'],
    ['**Day 3: Second session for variety**', '**Día 3: Segunda sesión para variar la experiencia**'],
    ['**Day 4: Buffer and departure**', '**Día 4: Día colchón y salida**'],
  ],
  'albuquerque-balloon-fiesta-2026-guide-2026-03-21::ja': [
    ['### Option 1: 3-day trip', '### 選択肢 1: 3日間の旅'],
    ['### Option 2: 4-day trip', '### 選択肢 2: 4日間の旅'],
    ['### Why Park and Ride should be central to your plan', '### なぜPark and Rideを計画の中心に置くべきか'],
    ['### A practical transport approach', '### 実践的な移動アプローチ'],
    ['### Common planning mistake to avoid', '### 避けたいよくある計画ミス'],
    ['## Sources', '## 出典'],
    ['**Day 1: Arrival day**', '**1日目: 到着日**'],
    ['**Day 2: Signature sunrise session**', '**2日目: 代表的な朝のセッション**'],
    ['**Day 3: Evening or specialty session, then departure**', '**3日目: 夜または特別セッション、その後出発**'],
    ['**Day 1: Arrival and logistics setup**', '**1日目: 到着と移動準備**'],
    ['**Day 2: First morning session**', '**2日目: 最初の朝セッション**'],
    ['**Day 3: Second session for variety**', '**3日目: 変化をつけるための2回目のセッション**'],
    ['**Day 4: Buffer and departure**', '**4日目: 予備時間と出発**'],
  ],
  'albuquerque-balloon-fiesta-2026-guide-2026-03-21::ko': [
    ['### Option 1: 3일 여행', '### 옵션 1: 3일 여행'],
    ['### Option 2: 4일 여행', '### 옵션 2: 4일 여행'],
    ['**Day 1: 도착일**', '**1일차: 도착일**'],
    ['**Day 2: 대표적인 일출 세션**', '**2일차: 대표적인 일출 세션**'],
    ['**Day 3: 저녁 또는 특수 세션, سپس 출발**', '**3일차: 저녁 또는 특수 세션 후 출발**'],
    ['**Day 1: 도착 및 교통 준비**', '**1일차: 도착 및 교통 준비**'],
    ['**Day 2: 첫 아침 세션**', '**2일차: 첫 아침 세션**'],
    ['**Day 3: 다양성을 위한 두 번째 세션**', '**3일차: 다양성을 위한 두 번째 세션**'],
    ['**Day 4: 여유일 및 출발**', '**4일차: 여유일 및 출발**'],
  ],
  'albuquerque-balloon-fiesta-2026-guide-2026-03-21::vi': [
    ['### Option 1: Chuyến đi 3 ngày', '### Phương án 1: Chuyến đi 3 ngày'],
    ['### Option 2: Chuyến đi 4 ngày', '### Phương án 2: Chuyến đi 4 ngày'],
  ],
  'albuquerque-balloon-fiesta-2026-guide-2026-03-21::zh': [
    ['## Sources', '## 资料来源'],
    ['**Day 1: Arrival day**', '**第1天：抵达日**'],
    ['**Day 2: Signature sunrise session**', '**第2天：标志性的日出场次**'],
    ['**Day 3: Evening or specialty session, then departure**', '**第3天：夜间或特色场次，然后离开**'],
    ['**Day 1: Arrival and logistics setup**', '**第1天：抵达并安排交通**'],
    ['**Day 2: First morning session**', '**第2天：第一场清晨活动**'],
    ['**Day 3: Second session for variety**', '**第3天：为了增加变化的第二场活动**'],
    ['**Day 4: Buffer and departure**', '**第4天：缓冲日与返程**'],
  ],
  'albuquerque-balloon-fiesta-2026-guide-2026-03-21::th': [
    ['**Day 1: Arrival day**', '**วันที่ 1: วันเดินทางมาถึง**'],
    ['**Day 2: Signature sunrise session**', '**วันที่ 2: ช่วงชมยามเช้าไฮไลต์หลัก**'],
    ['**Day 3: Evening or specialty session, then departure**', '**วันที่ 3: ช่วงเย็นหรือช่วงพิเศษ แล้วเดินทางออก**'],
    ['**Day 1: Arrival and logistics setup**', '**วันที่ 1: เดินทางมาถึงและเตรียมเรื่องการเดินทาง**'],
    ['**Day 2: First morning session**', '**วันที่ 2: ช่วงเช้าแรก**'],
    ['**Day 3: Second session for variety**', '**วันที่ 3: ช่วงที่สองเพื่อเปลี่ยนบรรยากาศ**'],
    ['**Day 4: Buffer and departure**', '**วันที่ 4: วันเผื่อเวลาและวันเดินทางออก**'],
  ],
  'oktoberfest-munich-2026-guide-2026-04-03::es': [
    ['*Image source: Wikimedia Commons*', '*Fuente de la imagen: Wikimedia Commons*'],
    ['## Sources', '## Fuentes'],
  ],
  'oktoberfest-munich-2026-guide-2026-04-03::vi': [
    ['## Sources', '## Nguồn tham khảo'],
  ],
  'mardi-gras-new-orleans-2026-travel-guide-2026-01-27::ko': [
    [
      '# 뉴올리언스의 2026 마디그라: 퍼스트데이 날짜, 최적의 지역, 그리고 처음 가는 사람을 위한 전략',
      '# 뉴올리언스 마디그라 2026: 팻 튜즈데이 날짜, 추천 지역, 처음 가는 사람을 위한 전략',
    ],
    [
      '뉴올리언스의 2026 마디그라: 퍼스트데이 날짜, 최적의 지역, 그리고 처음 가는 사람을 위한 전략',
      '뉴올리언스 마디그라 2026: 팻 튜즈데이 날짜, 추천 지역, 처음 가는 사람을 위한 전략',
    ],
    ['퍼스트데이', '팻 튜즈데이'],
    [
      '그에 못지않게 중요한 점은, Mardi Gras New Orleans가 **카니발 시즌은 1월 6일에 시작한다**고 밝히고 있다는 것입니다.',
      '그에 못지않게 중요한 점은, Mardi Gras New Orleans 공식 안내가 **카니발 시즌은 1월 6일에 시작한다**고 밝히고 있다는 사실입니다.',
    ],
  ],
  'rio-carnival-2026-travel-guide-2026-01-16::ko': [
    ['### Option 1: 현실적인 3일 계획', '### 옵션 1: 현실적인 3일 계획'],
    ['### Option 2: 더 여유로운 4일 계획', '### 옵션 2: 더 여유로운 4일 계획'],
    ['## Sources', '## 출처'],
    ['**Day 1: 도착 후 첫날은 가볍게 보낸다**', '**1일차: 도착 후 첫날은 가볍게 보낸다**'],
    ['**Day 2: 거리 블로코 중심**', '**2일차: 거리 블로코 중심**'],
    ['**Day 3: 삼바드롬의 밤**', '**3일차: 삼바드롬의 밤**'],
    ['**Day 1: 도착 및 가벼운 저녁**', '**1일차: 도착 및 가벼운 저녁**'],
    ['**Day 2: 거리 카니발 세션**', '**2일차: 거리 카니발 세션**'],
    ['**Day 3: 회복 및 두 번째 외출**', '**3일차: 회복 및 두 번째 외출**'],
    ['**Day 4: 삼바드롬의 밤**', '**4일차: 삼바드롬의 밤**'],
    ['Preta Gil Circuit downtown', '도심의 Preta Gil Circuit'],
  ],
  'rio-carnival-2026-travel-guide-2026-01-16::th': [
    ['## Sources', '## แหล่งข้อมูล'],
  ],
  'rio-carnival-2026-travel-guide-2026-01-16::vi': [
    ['### Option 1: Một kế hoạch 3 ngày thực tế', '### Phương án 1: Kế hoạch 3 ngày thực tế'],
    ['### Option 2: Một kế hoạch 4 ngày thoải mái hơn', '### Phương án 2: Kế hoạch 4 ngày thoải mái hơn'],
    ['**Day 1: Đến nơi và giữ ngày đầu nhẹ nhàng**', '**Ngày 1: Đến nơi và giữ ngày đầu nhẹ nhàng**'],
    ['**Day 2: Tập trung vào street bloco**', '**Ngày 2: Tập trung vào bloco đường phố**'],
    ['**Day 3: Đêm Sambadrome**', '**Ngày 3: Đêm ở Sambadrome**'],
    ['**Day 1: Đến nơi và buổi tối nhẹ nhàng**', '**Ngày 1: Đến nơi và buổi tối nhẹ nhàng**'],
    ['**Day 2: Phiên street carnival**', '**Ngày 2: Buổi carnival đường phố**'],
    ['**Day 3: Hồi phục và đi ra ngoài lần hai**', '**Ngày 3: Nghỉ nhịp và đi ra ngoài lần hai**'],
    ['**Day 4: Đêm Sambadrome**', '**Ngày 4: Đêm ở Sambadrome**'],
    ['Street carnival', 'Carnival đường phố'],
    ['street carnival', 'carnival đường phố'],
    ['street bloco', 'bloco đường phố'],
    ['Preta Gil Circuit downtown', 'Preta Gil Circuit ở trung tâm thành phố'],
  ],
  'st-patricks-festival-dublin-2026-guide-2026-02-19::es': [
    ['### Option 1: Free curbside viewing', '### Opción 1: Ver gratis el desfile desde la calle'],
    ['### Option 2: Paid grandstand viewing', '### Opción 2: Ver el desfile desde la tribuna de pago'],
    ['## Sources', '## Fuentes'],
  ],
  'st-patricks-festival-dublin-2026-guide-2026-02-19::ja': [
    ['### Option 1: 無料の路上観覧', '### 選択肢 1: 無料の沿道観覧'],
    ['### Option 2: 有料グランドスタンド観覧', '### 選択肢 2: 有料グランドスタンド観覧'],
    ['## Sources', '## 出典'],
  ],
  'st-patricks-festival-dublin-2026-guide-2026-02-19::pt': [
    ['### Option 1: Free curbside viewing', '### Opção 1: Ver o desfile de graça da rua'],
    ['### Option 2: Paid grandstand viewing', '### Opção 2: Assistir ao desfile da arquibancada paga'],
    ['**Day 1: Saturday, March 14 — Arrival and orientation**', '**Dia 1: Sábado, 14 de março — chegada e orientação inicial**'],
    ['**Day 2: Sunday, March 15 — Festival day beyond the parade**', '**Dia 2: Domingo, 15 de março — dia de festival além do desfile**'],
    ['**Day 3: Monday, March 16 — Second programme day and parade prep**', '**Dia 3: Segunda-feira, 16 de março — segundo dia de programação e preparação para o desfile**'],
    ['**Day 4: Tuesday, March 17 — Parade day**', '**Dia 4: Terça-feira, 17 de março — dia do desfile**'],
    ['### Best-fit 4-day plan: March 14 to 17', '### Melhor plano de 4 dias: 14 a 17 de março'],
    ['### Shorter 3-day plan: March 15 to 17', '### Plano mais curto de 3 dias: 15 a 17 de março'],
  ],
  'gion-matsuri-kyoto-2026-guide-2026-03-06::vi': [
    ['### Option 1: 3 days around the July 17 highlights', '### Phương án 1: 3 ngày xoay quanh các điểm nhấn của ngày 17 tháng 7'],
    ['### Option 2: 3 days around the July 24 highlights', '### Phương án 2: 3 ngày xoay quanh các điểm nhấn của ngày 24 tháng 7'],
    ['### If your priority is the biggest spectacle', '### Nếu ưu tiên của bạn là màn trình diễn lớn nhất'],
    ['### If your priority is atmosphere', '### Nếu ưu tiên của bạn là không khí lễ hội'],
    ['### If your priority is flexibility', '### Nếu ưu tiên của bạn là sự linh hoạt'],
    ['### Use official maps late in the planning process', '### Hãy dùng bản đồ chính thức ở giai đoạn cuối của quá trình lên kế hoạch'],
    ['**Day 1: Arrive on July 15 or 16**  ', '**Ngày 1: Đến Kyoto vào ngày 15 hoặc 16 tháng 7**  '],
    ['**Day 2: July 17 procession day**  ', '**Ngày 2: Ngày rước kiệu 17 tháng 7**  '],
    ['**Day 3: Buffer day in Kyoto**  ', '**Ngày 3: Ngày đệm ở Kyoto**  '],
    ['**Day 1: Arrive on July 22 or 23**  ', '**Ngày 1: Đến Kyoto vào ngày 22 hoặc 23 tháng 7**  '],
    ['**Day 2: July 24 procession day**  ', '**Ngày 2: Ngày rước kiệu 24 tháng 7**  '],
    ['**Day 3: Flexible Kyoto day**  ', '**Ngày 3: Một ngày linh hoạt ở Kyoto**  '],
    ['**Day 1: Arrive on July 14**  ', '**Ngày 1: Đến Kyoto vào ngày 14 tháng 7**  '],
    ['**Day 2: July 15 or 16**  ', '**Ngày 2: Ngày 15 hoặc 16 tháng 7**  '],
    ['**Day 3: July 17**  ', '**Ngày 3: Ngày 17 tháng 7**  '],
    ['**Day 4: Departure or extra Kyoto day**  ', '**Ngày 4: Khởi hành hoặc thêm một ngày ở Kyoto**  '],
  ],
  'day-of-the-dead-mexico-city-2026-guide-2026-04-11::fr': [
    ['### Day 1: Arrivez et familiarisez-vous avec le sens', '### Jour 1 : arrivez et familiarisez-vous avec le sens'],
    ['### Day 2: Concentrez-vous sur les ofrendas', '### Jour 2 : concentrez-vous sur les ofrendas'],
    ['### Day 3: Gardez votre programme ouvert au programme de la ville', '### Jour 3 : gardez votre programme ouvert pour la programmation de la ville'],
    ['### Day 4: Une dernière matinée lente, puis le départ', '### Jour 4 : une dernière matinée lente, puis le départ'],
  ],
  'day-of-the-dead-mexico-city-2026-guide-2026-04-11::ja': [
    ['### Day 1: 到着し、意味を理解する', '### 1日目: 到着し、意味を理解する'],
    ['### Day 2: オフレンダに集中する', '### 2日目: オフレンダに集中する'],
    ['### Day 3: 都市プログラムのために予定を空けておく', '### 3日目: 都市プログラムのために予定を空けておく'],
    ['### Day 4: 最後にゆっくりした朝を過ごしてから出発する', '### 4日目: 最後にゆっくりした朝を過ごしてから出発する'],
  ],
  'day-of-the-dead-mexico-city-2026-guide-2026-04-11::ko': [
    ['### Day 1: 도착해서 의미를 익히기', '### 1일차: 도착해서 의미를 익히기'],
    ['### Day 2: 오프렌다에 집중하기', '### 2일차: 오프렌다에 집중하기'],
    ['### Day 3: 도시 프로그램을 위해 일정 비워 두기', '### 3일차: 도시 프로그램을 위해 일정 비워 두기'],
    ['### Day 4: 마지막으로 천천히 보낸 뒤 출발하기', '### 4일차: 마지막으로 천천히 보낸 뒤 출발하기'],
  ],
  'day-of-the-dead-mexico-city-2026-guide-2026-04-11::th': [
    ['### Day 1: มาถึงและทำความเข้าใจกับความหมาย', '### วันที่ 1: มาถึงและทำความเข้าใจกับความหมาย'],
    ['### Day 2: โฟกัสที่ออฟเรนดา', '### วันที่ 2: โฟกัสที่ออฟเรนดา'],
    ['### Day 3: เว้นตารางไว้สำหรับโปรแกรมของเมือง', '### วันที่ 3: เว้นตารางไว้สำหรับโปรแกรมของเมือง'],
    ['### Day 4: เช้าแบบช้าๆ สุดท้าย แล้วออกเดินทาง', '### วันที่ 4: เช้าแบบช้าๆ สุดท้าย แล้วออกเดินทาง'],
  ],
};

function readEnvValue(envText, key) {
  const match = envText.match(new RegExp(`^${key}=(.*)$`, 'm'));
  return match ? match[1].trim().replace(/^"|"$/g, '') : null;
}

function readMongoConfig() {
  const envText = fs.readFileSync(ENV_PATH, 'utf8');
  const uri = process.env.MONGODB_URI || readEnvValue(envText, 'MONGODB_URI');
  const dbName =
    process.env.DB_NAME || readEnvValue(envText, 'DB_NAME') || 'momentbook';

  if (!uri) {
    throw new Error(`MONGODB_URI was not found in ${ENV_PATH}`);
  }

  return { uri, dbName };
}

function loadPayload() {
  if (!fs.existsSync(PAYLOAD_PATH)) {
    throw new Error(`Generated payload not found: ${PAYLOAD_PATH}`);
  }
  return JSON.parse(fs.readFileSync(PAYLOAD_PATH, 'utf8'));
}

function applyReplacements(body, replacements) {
  return replacements.reduce((value, [before, after]) => {
    if (!value.includes(before)) {
      return value;
    }
    return value.split(before).join(after);
  }, body);
}

async function main() {
  const payload = loadPayload();
  fs.mkdirSync(path.dirname(BACKUP_PATH), { recursive: true });

  if (!fs.existsSync(BACKUP_PATH)) {
    fs.copyFileSync(PAYLOAD_PATH, BACKUP_PATH);
  }

  const changed = [];

  payload.topics.forEach((topic) => {
    topic.records = topic.records.map((record) => {
      const key = `${topic.slug}::${record.language}`;
      const override = BODY_OVERRIDES[key];
      const replacements = REPLACEMENTS[key];
      if (!override && !replacements) {
        return record;
      }

      let nextRecord = { ...record };

      if (override) {
        nextRecord = {
          ...nextRecord,
          title: override.title,
          body: override.body,
        };
      }

      if (replacements) {
        const nextBody = applyReplacements(nextRecord.body, replacements);
        const firstLine = nextBody.split('\n')[0]?.trim();
        nextRecord.body = nextBody;
        if (firstLine?.startsWith('# ')) {
          nextRecord.title = firstLine.slice(2).trim();
        }
      }

      changed.push({
        slug: topic.slug,
        language: record.language,
      });

      return nextRecord;
    });
  });

  fs.writeFileSync(PAYLOAD_PATH, JSON.stringify(payload, null, 2));

  const { uri, dbName } = readMongoConfig();
  const client = new MongoClient(uri);
  await client.connect();

  try {
    const collection = client.db(dbName).collection('articles');
    const updatedAt = new Date();
    const operations = changed.map(({ slug, language }) => {
      const topic = payload.topics.find((item) => item.slug === slug);
      const record = topic.records.find((item) => item.language === language);

      return {
        updateOne: {
          filter: {
            slug,
            language,
          },
          update: {
            $set: {
              title: record.title,
              body: record.body,
              updatedAt,
            },
          },
        },
      };
    });

    const result = await collection.bulkWrite(operations, { ordered: true });

    console.log(
      JSON.stringify(
        {
          payloadPath: PAYLOAD_PATH,
          backupPath: BACKUP_PATH,
          changedCount: changed.length,
          matchedCount: result.matchedCount,
          modifiedCount: result.modifiedCount,
          changed,
        },
        null,
        2,
      ),
    );
  } finally {
    await client.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
