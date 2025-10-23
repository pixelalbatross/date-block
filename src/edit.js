/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @wordpress/no-unsafe-wp-apis */
/**
 * External dependencies
 */
import classnames from 'classnames';
import { format } from 'date-fns';

/**
 * WordPress dependencies
 */
import { useEntityProp } from '@wordpress/core-data';
import {
	useBlockProps,
	__experimentalDateFormatPicker as DateFormatPicker,
	AlignmentControl,
	BlockControls,
	InspectorControls,
} from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { Dropdown, PanelBody, PanelRow, ToolbarGroup, ToolbarButton } from '@wordpress/components';
import { useMemo, useState } from '@wordpress/element';
import { dateI18n, getSettings as getDateSettings } from '@wordpress/date';
import { DOWN } from '@wordpress/keycodes';
import { edit } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import DateTimePicker from './DateTimePicker';
import { TIMEZONELESS_FORMAT } from './constants';

export default function DateEdit(props) {
	const { attributes, setAttributes } = props;
	const { date, dateFormat, textAlign } = attributes;

	const blockProps = useBlockProps({
		className: classnames({
			[`has-text-align-${textAlign}`]: textAlign,
		}),
	});

	const [popoverAnchor, setPopoverAnchor] = useState(null);
	const popoverProps = useMemo(() => ({ anchor: popoverAnchor }), [popoverAnchor]);

	const dateSettings = getDateSettings();
	const [siteDateFormat = dateSettings.formats.date] = useEntityProp(
		'root',
		'site',
		'date_format',
	);
	const [siteTimeFormat = dateSettings.formats.time] = useEntityProp(
		'root',
		'site',
		'time_format',
	);

	return (
		<>
			<div {...blockProps}>
				<time dateTime={dateI18n('c', date)} ref={setPopoverAnchor}>
					{dateI18n(
						dateFormat || siteDateFormat,
						date || format(new Date(), TIMEZONELESS_FORMAT),
						false,
					)}
				</time>
			</div>

			<BlockControls group="block">
				<AlignmentControl
					value={textAlign}
					onChange={(nextAlign) => {
						setAttributes({ textAlign: nextAlign });
					}}
				/>
				<ToolbarGroup>
					<Dropdown
						popoverProps={popoverProps}
						renderContent={({ onClose }) => (
							<DateTimePicker
								currentDate={date}
								onChange={(nextDate) => setAttributes({ date: nextDate })}
								is12Hour={is12HourFormat(siteTimeFormat)}
								onClose={onClose}
								__nextRemoveResetButton={false}
							/>
						)}
						renderToggle={({ isOpen, onToggle }) => {
							const openOnArrowDown = (event) => {
								if (!isOpen && event.keyCode === DOWN) {
									event.preventDefault();
									onToggle();
								}
							};
							return (
								<ToolbarButton
									aria-expanded={isOpen}
									icon={edit}
									title={__('Change Date', 'date-block')}
									onClick={onToggle}
									onKeyDown={openOnArrowDown}
								/>
							);
						}}
					/>
				</ToolbarGroup>
			</BlockControls>

			<InspectorControls>
				<PanelBody title={__('Settings', 'date-block')}>
					<PanelRow>
						<DateFormatPicker
							format={dateFormat}
							defaultFormat={siteDateFormat}
							onChange={(nextDateFormat) =>
								setAttributes({ dateFormat: nextDateFormat })
							}
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>
		</>
	);
}

export function is12HourFormat(timeFormat) {
	// To know if the time format is a 12 hour time, look for any of the 12 hour
	// format characters: 'a', 'A', 'g', and 'h'. The character must be
	// unescaped, i.e. not preceded by a '\'. Coincidentally, 'aAgh' is how I
	// feel when working with regular expressions.
	// https://www.php.net/manual/en/datetime.format.php
	return /(?:^|[^\\])[aAgh]/.test(timeFormat);
}
