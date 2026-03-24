export function MobileWarning() {
  return (
    <section className="scene-card rounded-[28px] p-5">
      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent-deep">
        Mobile note
      </p>
      <p className="mt-3 text-sm leading-6 text-slate-600">
        Device-orientation permissions and gyroscope-specific interactions will be
        introduced in a later phase. For now, the scaffold focuses on reliable 3D
        rendering across desktop and mobile viewports.
      </p>
    </section>
  );
}
