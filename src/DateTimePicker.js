/* eslint-disable @wordpress/no-unsafe-wp-apis */
/**
 * External dependencies
 */
import { format } from 'date-fns';

/**
 * WordPress dependencies
 */
import {
	DateTimePicker,
	__experimentalVStack as VStack,
	__experimentalHStack as HStack,
	__experimentalHeading as Heading,
	__experimentalSpacer as Spacer,
	Button,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { forwardRef } from '@wordpress/element';
import { getSettings } from '@wordpress/date';
import { closeSmall } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import { TIMEZONELESS_FORMAT } from './constants';

function PublishDateTimePicker({ onClose, onChange, ...additionalProps }, ref) {
	const label = __('Now', 'date-block');
	return (
		<div ref={ref} className="block-editor-publish-date-time-picker">
			<VStack className="block-editor-inspector-popover-header" spacing={4}>
				<HStack alignment="center">
					<Heading
						className="block-editor-inspector-popover-header__heading"
						level={2}
						size={13}
					>
						{__('Select Date', 'date-block')}
					</Heading>
					<Spacer />
					<Button
						key={label}
						className="block-editor-inspector-popover-header__action"
						label={label}
						variant="tertiary"
						onClick={() => {
							onChange(format(new Date(), TIMEZONELESS_FORMAT));
						}}
					>
						{label}
					</Button>
					{onClose && (
						<Button
							className="block-editor-inspector-popover-header__action"
							label={__('Close', 'date-block')}
							icon={closeSmall}
							onClick={onClose}
						/>
					)}
				</HStack>
			</VStack>
			<DateTimePicker
				startOfWeek={getSettings().l10n.startOfWeek}
				__nextRemoveHelpButton
				__nextRemoveResetButton
				onChange={onChange}
				{...additionalProps}
			/>
		</div>
	);
}

export default forwardRef(PublishDateTimePicker);
