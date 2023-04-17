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
	__experimentalPublishDateTimePicker as PublishDateTimePicker,
	AlignmentControl,
	BlockControls,
	InspectorControls,
} from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { Dropdown, PanelBody, PanelRow, ToolbarGroup, ToolbarButton } from '@wordpress/components';
import { useMemo, useState, useEffect } from '@wordpress/element';
import { dateI18n, getSettings as getDateSettings } from '@wordpress/date';
import { DOWN } from '@wordpress/keycodes';
import { edit } from '@wordpress/icons';

const TIMEZONELESS_FORMAT = "yyyy-MM-dd'T'HH:mm:ss";

// eslint-disable-next-line jsdoc/require-param
/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit(props) {
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

	useEffect(() => {
		if (!date) {
			setAttributes({ date: format(new Date(), TIMEZONELESS_FORMAT) });
		}
	}, [date, setAttributes]);

	return (
		<>
			<div {...blockProps}>
				<time dateTime={dateI18n('c', date)} ref={setPopoverAnchor}>
					{dateI18n(dateFormat || siteDateFormat, date, false)}
				</time>
			</div>

			<BlockControls group="block">
				<AlignmentControl
					value={textAlign}
					onChange={(nextAlign) => {
						setAttributes({ textAlign: nextAlign });
					}}
				/>
				{date && (
					<ToolbarGroup>
						<Dropdown
							popoverProps={popoverProps}
							renderContent={({ onClose }) => (
								<PublishDateTimePicker
									currentDate={date}
									onChange={(nextDate) => setAttributes({ date: nextDate })}
									is12Hour={is12HourFormat(siteTimeFormat)}
									onClose={onClose}
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
				)}
			</BlockControls>

			<InspectorControls>
				<PanelBody title={__('Date Settings', 'date-block')}>
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
