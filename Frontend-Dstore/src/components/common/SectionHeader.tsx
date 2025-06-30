import { Box, Stack, Typography } from '@mui/material';
import { THEME_COLORS } from '@/constants/data';
import TabButton from './TabButton';

interface SectionHeaderProps {
    title: string;
    tabs?: Array<{ label: string; value: string }>;
    activeTab: string;
    onTabChange: (value: string) => void;
    showViewAll?: boolean;
    onViewAll?: () => void;
}

const SectionHeader = ({
    title,
    tabs,
    activeTab,
    onTabChange,
    showViewAll = false,
    onViewAll
}: SectionHeaderProps) => {
    return (
        <Stack direction="row" justifyContent="space-between">
            <Box bgcolor={THEME_COLORS.primary} borderRadius={1}>
                <Typography
                    variant='h6'
                    className='uppercase font-medium'
                    px={1}
                    color='#fff'
                >
                    {title}
                </Typography>
            </Box>

            <Stack direction="row" spacing={1}>
                {tabs?.map((tab, index) => (
                    <TabButton
                        key={index}
                        label={tab.label}
                        value={tab.value}
                        activeTab={activeTab}
                        onClick={onTabChange}
                    />
                ))}

                {showViewAll && (
                    <TabButton
                        label="Xem tất cả"
                        value=""
                        activeTab={activeTab}
                        onClick={onViewAll || onTabChange}
                    />
                )}
            </Stack>
        </Stack>
    );
};

export default SectionHeader; 