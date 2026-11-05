import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import TrainerProgressTrackingComparisonDelta from '../components/TrainerCoachingIndividualProgressProgressTrackingComparisonDelta';
vi.mock('next-intl', () => ({ useLocale: () => 'en' }));
describe('Progress comparison numeric safety', () => {
  it('renders an accessible placeholder instead of NaN/Infinity trends', () => {
    const { rerender } = render(<TrainerProgressTrackingComparisonDelta value={Number.NaN} lowerIsBetter={false} />);
    expect(screen.getByText('—')).toBeInTheDocument();
    rerender(<TrainerProgressTrackingComparisonDelta value={Infinity} lowerIsBetter={true} />);
    expect(screen.getByText('—')).toBeInTheDocument();
  });
});
