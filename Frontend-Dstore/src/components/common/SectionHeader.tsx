import { Box, Stack, Typography, useMediaQuery, useTheme, Link } from '@mui/material';
import { THEME_COLORS } from '@/constants/data';
import TabButton from '@/components/common/TabButton';

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
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Stack
            direction="row"
            justifyContent="space-between"
            alignItems='center'
            spacing={2}
        >
            <Box bgcolor={THEME_COLORS.primary} borderRadius={1} px={1} py={0.5}>
                <Typography
                    variant='h6'
                    className='uppercase font-medium'
                    color='#fff'
                >
                    {title}
                </Typography>
            </Box>

            {isSmallScreen ? (
                showViewAll && (
                    <Link
                        component="button"
                        underline="hover"
                        color="primary"
                        onClick={onViewAll || (() => onTabChange(''))}
                        sx={{ fontWeight: 500 }}
                    >
                        Xem tất cả
                    </Link>
                )
            ) : (
                <Stack direction="row" spacing={1} flexWrap="wrap">
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
            )}
        </Stack>
    );
};

export default SectionHeader;