import { render, screen } from '@testing-library/react';
import { Header } from './Header';

describe('Header', () => {
    it('renders user information', () => {
        render(<Header />);

        expect(screen.getByText('Dra. Letícia Lopes')).toBeInTheDocument();
        expect(screen.getByText('Marketing Consultant')).toBeInTheDocument();
        expect(screen.getByText('AL')).toBeInTheDocument();
    });

    it('renders notification button', () => {
        render(<Header />);

        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();
    });
});