import { render, screen } from '@testing-library/react';
import { SummaryCard } from './SummaryCard';

describe('SummaryCard', () => {
    it('renders with positive badge', () => {
        render(
            <SummaryCard
                label="Test Label"
                value="R$ 1.000,00"
                caption="Test caption"
                badge="+10%"
                badgeType="positive"
            />
        );

        expect(screen.getByText('Test Label')).toBeInTheDocument();
        expect(screen.getByText('R$ 1.000,00')).toBeInTheDocument();
        expect(screen.getByText('Test caption')).toBeInTheDocument();
        expect(screen.getByText('+10%')).toBeInTheDocument();
    });

    it('renders with negative badge', () => {
        render(
            <SummaryCard
                label="Test Label"
                value="R$ 500,00"
                caption="Test caption"
                badge="-5%"
                badgeType="negative"
            />
        );

        expect(screen.getByText('-5%')).toBeInTheDocument();
    });

    it('applies custom style', () => {
        const customStyle = { marginTop: '20px' };
        render(
            <SummaryCard
                label="Test"
                value="R$ 100"
                caption="Test"
                badge="+1%"
                badgeType="positive"
                style={customStyle}
            />
        );

        const article = screen.getByRole('article');
        expect(article).toHaveStyle({ marginTop: '20px' });
    });
});