import * as React from "react";

export function useResponsiveImage({ src, onLoad }, forwardedRef) {
	const wrapperRef = React.useRef(null);
	const imgRef = React.useRef(null);
	const [loaded, setLoaded] = React.useState(false);

	React.useImperativeHandle(forwardedRef, () => imgRef.current);

	/**
	 * Reset the loaded state when the source changes
	 */
	React.useEffect(() => setLoaded(false), [src]);

	return {
		wrapperRef,
		imgRef,
		loaded,
		handleLoad: (event) => {
			setLoaded(true);
			onLoad?.(event);
		},
	};
}
