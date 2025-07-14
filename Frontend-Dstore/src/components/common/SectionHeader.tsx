import { Box, Stack, Typography, useMediaQuery, useTheme, Link } from '@mui/material';
import { TabItem, THEME_COLORS } from '@/constants/data';
import TabButton from '@/components/common/TabButton';
interface SectionHeaderProps {
    title: string;
    tabs?: TabItem[];
    activeTab: string;
    onTabChange: (value: string) => void;
    showViewAll?: boolean;
    onViewAll?: () => void;
}

const SectionHeader = ({
    title,
    tabs,
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
                            title={tab.name}
                            slug={tab.slug}
                            onClick={onTabChange}
                        />
                    ))}

                    {showViewAll && (
                        <TabButton
                            title="Xem tất cả"
                            slug=""
                            onClick={onViewAll || onTabChange}
                        />
                    )}
                </Stack>
            )}
        </Stack>
    );
};

export default SectionHeader;