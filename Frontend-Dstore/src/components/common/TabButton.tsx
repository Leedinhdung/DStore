import { Button } from '@mui/material';
import { THEME_COLORS } from '@/constants/data';

interface TabButtonProps {
    label: string;
    value: string;
    activeTab: string;
    onClick: (value: string) => void;
}

const TabButton = ({ label, value, activeTab, onClick }: TabButtonProps) => {
    const isActive = activeTab === value;

    return (
        <Button
            size="small"
            sx={{
                border: 1,
                backgroundColor: isActive ? THEME_COLORS.primary : 'white',
                color: isActive ? 'white' : 'black',
                '&:hover': {
                    backgroundColor: THEME_COLORS.primary,
                    color: 'white',
                },
            }}
            type="button"
            onClick={() => onClick(value)}
        >
            {label}
        </Button>
    );
};

export default TabButton; 