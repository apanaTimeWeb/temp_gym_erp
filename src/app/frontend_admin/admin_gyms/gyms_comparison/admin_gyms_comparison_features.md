# Admin Gyms Comparison Feature Documentation

## 1. Feature Overview
The `gyms_comparison` module provides side-by-side performance benchmarking across all gym branches for administrative decision-making.

## 2. Capabilities
- Multi-branch selection and comparative metric calculation.
- Financial metric comparison (revenue, expenses, net profit, profit margins).
- Operational metric comparison (active members, staff count, equipment count, occupancy rates).
- Visual KPI cards and performance benchmark charts.
- CSV export and printing of comparison reports.

## 3. Architecture & Routing
- Route: `/frontend_admin/admin_gyms/gyms_comparison`
- Layout: Inherits admin navigation shell.
- Isolation: Independent submodule with local components, config, locales, and contracts.
