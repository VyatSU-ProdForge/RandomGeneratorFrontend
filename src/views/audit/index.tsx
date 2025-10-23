import React from 'react';
import { AuditMobile } from './mobile';
import { AuditDesktop } from './desktop';
import { BREAKPOINTS } from '@core/config';

export function Audit(): React.ReactElement {
	const [isMobile, setIsMobile] = React.useState(window.innerWidth < BREAKPOINTS.DESKTOP);

	React.useEffect(() => {
		const handleResize = (): void => {
			setIsMobile(window.innerWidth < BREAKPOINTS.DESKTOP);
		};

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return isMobile ? <AuditMobile /> : <AuditDesktop />;
}


