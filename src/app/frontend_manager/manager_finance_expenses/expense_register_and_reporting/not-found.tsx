// RESPONSIBILITY: Renders the manager_expenses route boundary (async) and delegates feature behavior to module-owned components/hooks; it does not own transport logic.
import { getTranslations } from 'next-intl/server';
import { MANAGER_EXPENSE_REGISTER_AND_REPORTING_ROUTES } from '@/app/frontend_manager/manager_finance_expenses/expense_register_and_reporting/config/manager_expense_register_and_reporting.url_config';




/** @description Renders the manager_expenses route boundary. @dependencies Uses only the route's owning module and approved application infrastructure. @edge-case Provides documented loading, error, not-found, or route-entry behavior without introducing business logic outside the feature boundary. */
export default async function NotFound() {
  const t = await getTranslations('MANAGER_EXPENSE_REGISTER_AND_REPORTING');
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center p-8 text-center">
      <h2 className="text-4xl font-bold text-text-primary mb-4">404</h2>
      <h3 className="text-2xl font-semibold mb-2">{t("TEXT_404_TITLE")}</h3>
      <p className="text-text-secondary mb-8 max-w-md">{t("TEXT_404_DESCRIPTION")}</p>
      <a data-testid="manager_expenses-not-found-home" href={MANAGER_EXPENSE_REGISTER_AND_REPORTING_ROUTES.UI.HOME} className="px-6 py-2 bg-primary text-on-primary rounded-lg hover:bg-primary-hover motion-safe:transition-all motion-safe:duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page">
        {t("TEXT_404_RETURN")}
      </a>
    </div>
  );
}
