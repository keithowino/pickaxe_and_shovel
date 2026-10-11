import * as React from "react";
import { cn } from "../../../lib/index.js";
import { useResponsiveImage } from "./useResponsiveImage.jsx";

export const ResponsiveImage = React.forwardRef(
	(
		{
			src,
			alt = "",
			fittingType = "cover", // "cover" | "fit"
			className,
			style,
			aspectRatio,
			onLoad,
			...props
		},
		ref,
	) => {
		const { wrapperRef, imgRef, loaded, handleLoad } = useResponsiveImage(
			{ src, onLoad },
			ref,
		);

		return (
			<span
				ref={wrapperRef}
				className={cn(
					"inline-block relative overflow-hidden",
					className,
				)}
				style={{ aspectRatio, ...style }}
			>
				<img
					ref={imgRef}
					src={src}
					alt={alt}
					loading="lazy"
					decoding="async"
					onLoad={handleLoad}
					className={cn(
						"block w-full h-full transition-opacity duration-300",
						fittingType === "fit"
							? "object-contain"
							: "object-cover",
						loaded ? "opacity-100" : "opacity-0",
					)}
					{...props}
				/>
			</span>
		);
	},
);

ResponsiveImage.displayName = "ResponsiveImage";
