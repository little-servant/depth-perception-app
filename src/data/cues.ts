import type { DepthCueState } from "@/types";

export type DepthCue = {
  id: keyof DepthCueState;
  nameKo: string;
  nameEn: string;
  descriptionKo: string;
  prediction: {
    questionKo: string;
    options: string[];
    correctIndex: number;
  };
  explanation: {
    mechanismKo: string;
    examplesKo: string[];
    referenceApa: string;
    funFactKo: string;
  };
};

export const cues: DepthCue[] = [
  {
    id: "perspective",
    nameKo: "선형 원근법",
    nameEn: "Linear Perspective",
    descriptionKo: "멀수록 작아지는 수렴 효과",
    prediction: {
      questionKo: "선형 원근법을 끄면 이 장면이 어떻게 변할까요?",
      options: [
        "물체들이 갑자기 사라진다",
        "모든 물체가 똑같이 커 보인다",
        "장면이 납작하고 평평하게 느껴진다",
        "색깔이 흐릿해진다",
      ],
      correctIndex: 2,
    },
    explanation: {
      mechanismKo:
        "평행선이 멀어질수록 수렴하고 동일한 물체가 더 작은 망막상을 만든다는 기하학적 관계는 강력한 단안 깊이 신호입니다. 시각계는 이 선형 원근 정보를 다른 단서와 통합해 장면의 배치를 빠르게 추정합니다.",
      examplesKo: [
        "고속도로 중앙선이 멀리서 하나로 모이는 것처럼 보이는 현상",
        "르네상스 회화에서 의도적으로 과장된 소실점 기법",
        "기차 레일이 지평선에서 만나는 사진",
      ],
      referenceApa:
        "Cutting, J. E., & Vishton, P. M. (1995). Perceiving layout and knowing distances: The integration, relative potency, and contextual use of different information about depth. In W. Epstein & S. Rogers (Eds.), Perception of Space and Motion (pp. 69-117). Academic Press.",
      funFactKo:
        "원근법 이전의 중세 유럽 회화에서는 중요한 인물을 단순히 크게 그렸습니다. 거리가 아닌 사회적 지위가 크기를 결정했죠.",
    },
  },
  {
    id: "occlusion",
    nameKo: "폐색",
    nameEn: "Occlusion",
    descriptionKo: "가까운 물체가 먼 물체를 가림",
    prediction: {
      questionKo: "폐색 단서를 끄면 이 장면이 어떻게 변할까요?",
      options: [
        "물체들이 모두 사라진다",
        "조명이 꺼진다",
        "물체들이 반투명해져 앞뒤 관계를 알기 어렵다",
        "카메라가 멀어진다",
      ],
      correctIndex: 2,
    },
    explanation: {
      mechanismKo:
        "한 물체가 다른 물체의 경계를 끊어 가리면 시각계는 가리는 물체를 앞, 가려진 물체를 뒤에 둔 표면 배치로 해석합니다. 이 폐색 단서는 한쪽 눈만으로도 안정적으로 작동하는 대표적인 장면 분절 신호입니다.",
      examplesKo: [
        "사진에서 건물이 산을 가릴 때 건물이 더 가깝다는 걸 즉각 인식",
        "자동차들이 부분적으로 겹쳐 보일 때 앞뒤 순서를 파악",
        "손으로 물체를 가리면 손이 물체보다 가깝다고 즉각 판단",
      ],
      referenceApa: "Gibson, J. J. (1979). The Ecological Approach to Visual Perception. Houghton Mifflin.",
      funFactKo:
        "마술사들은 폐색을 역이용합니다. 물체를 배경과 같은 색으로 칠해 경계를 없애면 뇌가 해당 물체를 '존재하지 않는다'고 판단합니다.",
    },
  },
  {
    id: "shadows",
    nameKo: "그림자",
    nameEn: "Shadows",
    descriptionKo: "그림자가 거리와 위치를 알려줌",
    prediction: {
      questionKo: "그림자를 끄면 이 장면이 어떻게 변할까요?",
      options: [
        "물체들이 공중에 뜬 것처럼 보인다",
        "장면이 더 밝아진다",
        "물체들이 납작해 보인다",
        "두 가지 이상이 동시에 느껴진다",
      ],
      correctIndex: 3,
    },
    explanation: {
      mechanismKo:
        "그림자와 음영은 광원 방향뿐 아니라 물체와 바닥의 상대 위치까지 함께 드러냅니다. 특히 그림자의 위치 변화는 물체가 떠 있는지, 얼마나 떨어져 있는지 판단하게 만드는 강한 깊이 단서입니다.",
      examplesKo: [
        "초기 3D 게임에서 그림자 없는 캐릭터가 어색하게 공중에 떠 보이던 현상",
        "맑은 날과 흐린 날 야외에서 거리 판단의 차이",
        "달 표면 사진에서 분화구 깊이를 그림자로 추정하는 방법",
      ],
      referenceApa:
        "Kersten, D., Knill, D. C., Mamassian, P., & Bulthoff, I. (1996). Illusory motion from shadows. Nature, 379, 31.",
      funFactKo:
        "인간의 뇌는 광원이 항상 위에서 온다고 가정합니다. 그림자가 아래에 생기도록 사진을 뒤집으면 볼록한 것이 오목하게 반전되어 보입니다.",
    },
  },
  {
    id: "atmospheric",
    nameKo: "공기 원근법",
    nameEn: "Atmospheric Perspective",
    descriptionKo: "멀수록 흐릿하고 푸르게 보임",
    prediction: {
      questionKo: "공기 원근법을 끄면 이 장면이 어떻게 변할까요?",
      options: [
        "먼 물체가 더 선명해진다",
        "장면의 깊이감이 줄어드는 느낌이 든다",
        "안개만 사라진다",
        "두 가지 이상이 동시에 느껴진다",
      ],
      correctIndex: 3,
    },
    explanation: {
      mechanismKo:
        "대기 중 산란은 먼 표면의 대비와 세부 정보를 줄이고, 색을 배경 쪽으로 이동시켜 거리 추정을 돕습니다. 시각계는 이런 대비 저하를 공중 원근법의 표지로 사용해 더 먼 대상을 뒤쪽에 배치합니다.",
      examplesKo: [
        "산수화에서 먼 산을 옅고 청회색으로 그리는 전통 기법",
        "맑은 날 대도시 스카이라인과 안개 낀 날의 차이",
        "항공사진에서 지평선 근처가 늘 뿌옇게 보이는 이유",
      ],
      referenceApa:
        "O'Shea, R. P., Govan, D. G., & Sekuler, R. (1997). Blur and contrast as pictorial depth cues. Perception, 26(5), 599-612.",
      funFactKo:
        "레오나르도 다 빈치가 처음 체계화한 원근법입니다. 모나리자 배경의 안개 낀 산이 대표적인 예입니다.",
    },
  },
  {
    id: "textureGradient",
    nameKo: "텍스처 그래디언트",
    nameEn: "Texture Gradient",
    descriptionKo: "바닥 패턴이 멀수록 촘촘해짐",
    prediction: {
      questionKo: "텍스처 그래디언트를 끄면 이 장면이 어떻게 변할까요?",
      options: [
        "바닥이 사라진다",
        "바닥이 납작하고 균일하게 느껴진다",
        "물체들이 바닥에 붙지 않는 것처럼 보인다",
        "물체들이 더 작아 보인다",
      ],
      correctIndex: 1,
    },
    explanation: {
      mechanismKo:
        "반복 패턴은 거리가 멀어질수록 더 촘촘하고 작은 망막상으로 압축됩니다. Gibson은 이 질감 밀도의 변화율이 표면의 기울기와 상대 거리를 직접 알려주는 정보라고 설명했습니다.",
      examplesKo: [
        "아스팔트 도로의 자갈 패턴이 멀수록 촘촘해 보이는 현상",
        "잔디밭 사진에서 가까운 잔디는 굵고 먼 잔디는 가늘게 보임",
        "벽돌 담을 정면에서 찍었을 때 윗부분 벽돌이 더 작아 보이는 효과",
      ],
      referenceApa: "Gibson, J. J. (1950). The Perception of the Visual World. Houghton Mifflin.",
      funFactKo:
        "이 단서는 바닥이 완전히 평평하다는 가정하에 작동합니다. 계단에서는 예상치 못한 패턴 변화가 생겨 뇌가 순간적으로 혼란스러워집니다.",
    },
  },
  {
    id: "relativeSize",
    nameKo: "상대적 크기",
    nameEn: "Relative Size",
    descriptionKo: "익숙한 물체의 크기로 거리를 판단",
    prediction: {
      questionKo: "상대적 크기 단서를 끄면 이 장면이 어떻게 변할까요?",
      options: [
        "가까운 물체가 더 선명해진다",
        "멀리 있는 물체가 자동으로 흐려진다",
        "거리감이 혼란스러워지고 크기로 앞뒤를 읽기 어려워진다",
        "카메라가 더 넓은 화각으로 바뀐다",
      ],
      correctIndex: 2,
    },
    explanation: {
      mechanismKo:
        "익숙한 물체의 실제 크기를 알고 있으면, 시각계는 망막상 크기와 비교해 상대 거리를 추정할 수 있습니다. 이런 크기-거리 결합이 흔들리면 같은 장면도 훨씬 불안정하고 납작하게 느껴집니다.",
      examplesKo: [
        "멀리 있는 동전이 작아 보여도 실제 크기를 알기에 거리감을 추정하는 상황",
        "사람 실루엣의 키를 기준으로 실내 공간의 깊이를 가늠하는 장면",
        "주차된 자동차 크기를 비교해 거리와 위치를 빠르게 판단하는 경우",
      ],
      referenceApa:
        "Ittelson, W. H. (1951). Size as a cue to distance: Static localization. American Journal of Psychology, 64(1), 54-67.",
      funFactKo:
        "달이 지평선 근처에서 더 커 보이는 달 착시도 상대적 크기 단서와 깊이 해석이 함께 작동하는 대표적 사례입니다.",
    },
  },
  {
    id: "motionParallax",
    nameKo: "운동 시차",
    nameEn: "Motion Parallax",
    descriptionKo: "시점을 움직이면 가까운 물체가 더 빨리 움직임",
    prediction: {
      questionKo: "운동 시차 단서를 끄면 이 장면이 어떻게 변할까요?",
      options: [
        "가까운 물체만 더 크게 흔들린다",
        "물체들이 같은 속도로 움직여 거리감이 사라진다",
        "광원이 더 밝아진다",
        "바닥 패턴이 더 촘촘해진다",
      ],
      correctIndex: 1,
    },
    explanation: {
      mechanismKo:
        "관찰자가 이동할 때 가까운 물체는 빠르게, 먼 물체는 느리게 망막 위를 가로지릅니다. 이 속도 차이는 양안시차 없이도 강력한 깊이 신호가 되어 공간의 층위를 드러냅니다.",
      examplesKo: [
        "기차 창밖에서 가까운 전봇대는 빠르게 지나가고 먼 산은 천천히 움직여 보이는 현상",
        "고개를 좌우로 흔들 때 책상 위 물건과 뒤 벽이 서로 다른 속도로 이동하는 장면",
        "주행 게임에서 전경과 배경 레이어를 다른 속도로 움직여 깊이를 만드는 방식",
      ],
      referenceApa:
        "Rogers, B., & Graham, M. (1979). Motion parallax as an independent cue for depth perception. Perception, 8(2), 125-134.",
      funFactKo:
        "올빼미가 고개를 좌우로 흔드는 행동은 운동 시차를 극대화해 거리를 정밀하게 읽기 위한 전략으로 알려져 있습니다.",
    },
  },
];
