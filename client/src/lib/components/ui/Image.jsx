// client/src/shared/ui/image/Image.jsx
import * as React from "react";
import { ResponsiveImage } from "./responsiveImage.jsx";

const FALLBACK_IMAGE_URL = "/images/image-fallback.svg";

export const Image = React.forwardRef(
	(
		{
			src,
			fittingType = "cover",
			originWidth,
			originHeight,
			onError,
			...props
		},
		ref,
	) => {
		const [failed, setFailed] = React.useState(false);

		// Reset failure state when src changes — otherwise an image that failed
		// once would stay on the fallback forever.
		React.useEffect(() => setFailed(false), [src]);

		const handleError = (event) => {
			setFailed(true);
			onError?.(event);
		};

		// No src, or a previous load failed → render the fallback image directly.
		if (!src || failed) {
			return (
				<img
					ref={ref}
					src={FALLBACK_IMAGE_URL}
					alt=""
					loading="lazy"
					decoding="async"
					className={props.className}
					style={props.style}
				/>
			);
		}

		const aspectRatio =
			originWidth && originHeight
				? `${originWidth} / ${originHeight}`
				: undefined;

		return (
			<ResponsiveImage
				ref={ref}
				src={src}
				fittingType={fittingType}
				aspectRatio={aspectRatio}
				onError={handleError}
				{...props}
			/>
		);
	},
);

Image.displayName = "Image";
