import Link from "next/link";

const highlights = [
  "7개 깊이 단서를 켜고 끄며 공간 지각이 무너지는 순간을 직접 비교",
  "15개 트라이얼 2AFC 실험으로 텍스처·크기 단서 의존도 요약",
  "모바일 자이로와 데스크톱 포인터를 함께 지원하는 반응형 3D 체험",
] as const;

const paths = [
  {
    href: "/explore",
    eyebrow: "01 Explore",
    title: "깊이 단서를 해부하다",
    description: "선형 원근법부터 운동 시차까지, 단서를 하나씩 꺼 보며 지각 변화를 체험합니다.",
    cta: "탐험 시작",
  },
  {
    href: "/test",
    eyebrow: "02 Test",
    title: "나의 단서 의존도 측정",
    description: "기준선·텍스처 제거·크기 왜곡 조건에서 어떤 단서에 더 기대는지 확인합니다.",
    cta: "테스트 시작",
  },
] as const;

export default function Home() {
  return (
    <main className="min-h-screen px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-2rem)] w-full max-w-7xl flex-col gap-6">
        <section className="panel-surface overflow-hidden rounded-[36px] px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] lg:items-start">
            <div className="space-y-6">
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.34em] text-accent-primary">
                  Depth Perception Lab
                </p>
                <h1 className="text-balance text-4xl font-semibold tracking-[-0.05em] text-text-primary sm:text-5xl lg:text-6xl">
                  Depth Lab
                  <span className="mt-2 block text-2xl font-medium tracking-[-0.03em] text-text-secondary sm:text-3xl">
                    깊이를 해부하다
                  </span>
                </h1>
                <p className="max-w-2xl text-sm leading-7 text-text-secondary sm:text-base">
                  평면 화면에서 왜 깊이가 느껴지는지, 그리고 어떤 단서가 빠지면 그 감각이
                  얼마나 쉽게 흔들리는지 직접 실험하는 지각심리학 체험형 웹앱입니다.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/explore"
                  className="flex min-h-[48px] items-center justify-center rounded-[24px] bg-accent-primary px-6 py-3 text-sm font-semibold text-[#052017] transition-transform duration-200 hover:-translate-y-0.5"
                >
                  Explore로 이동
                </Link>
                <Link
                  href="/test"
                  className="panel-line flex min-h-[48px] items-center justify-center rounded-[24px] px-6 py-3 text-sm font-semibold text-text-primary transition-colors duration-200 hover:border-white/20 hover:bg-white/8"
                >
                  Test로 이동
                </Link>
              </div>
            </div>

            <div className="grid gap-3">
              {highlights.map((item) => (
                <div key={item} className="panel-line rounded-[24px] px-4 py-4">
                  <p className="text-sm leading-6 text-text-primary">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          {paths.map((item) => (
            <article key={item.href} className="panel-surface rounded-[32px] p-5 sm:p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-accent-secondary">
                {item.eyebrow}
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-text-primary">
                {item.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-text-secondary">
                {item.description}
              </p>
              <Link
                href={item.href}
                className="panel-line mt-5 flex min-h-[48px] items-center justify-between rounded-[24px] px-4 py-3 text-sm font-semibold text-text-primary transition-colors duration-200 hover:border-white/20 hover:bg-white/8"
              >
                <span>{item.cta}</span>
                <span className="text-text-secondary">→</span>
              </Link>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
