// RESPONSIBILITY: Framework route artifact for white-labeling.
/**
 * @description Renders WhiteLabelingLoading within the owning Superadmin feature module.
 * @dependencies Uses only dependencies declared in this module file and documented feature infrastructure.
 * @edge-case Preserves documented loading, empty, error, disabled, retry, and repeated-action behavior.
 */
export default function SuperadminPlatformConfigurationWhiteLabelingLoading() {
  return (
    <div className="space-y-6">
      <div className="h-8 w-64 bg-card rounded motion-safe:animate-pulse" />
      <div className="h-4 w-96 bg-card rounded motion-safe:animate-pulse" />
      <div className="h-16 w-full bg-card rounded-xl motion-safe:animate-pulse mt-6" />
      <div className="h-96 w-full bg-card rounded-xl motion-safe:animate-pulse mt-4" />
    </div>
  );
}
