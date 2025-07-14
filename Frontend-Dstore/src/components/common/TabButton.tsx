import type React from "react"

import { Button } from "@mui/material"
import { THEME_COLORS } from "@/constants/data"

interface TabButtonProps {
  title: string
  slug: string
  isActive?: boolean
  onClick: (value: string) => void
}

const TabButton = ({ title, slug, isActive = false, onClick }: TabButtonProps) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    event.stopPropagation()

    console.log("TabButton clicked:", slug, title)

    if (typeof onClick === "function") {
      onClick(slug)
    } else {
      console.warn("onClick is not a function:", onClick)
    }
  }

  return (
    <Button
      size="small"
      sx={{
        border: 1,
        backgroundColor: isActive ? THEME_COLORS.primary : "white",
        color: isActive ? "white" : "black",
        borderColor: isActive ? THEME_COLORS.primary : "gray",
        "&:hover": {
          backgroundColor: THEME_COLORS.primary,
          color: "white",
        },
        minWidth: "auto",
        px: 2,
        py: 0.5,
      }}
      type="button"
      onClick={handleClick}
    >
      {title}
    </Button>
  )
}

export default TabButton
