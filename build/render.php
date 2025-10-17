<?php
/**
 * Date
 *
 * @var array     $attributes Block attributes.
 * @var string    $content    Block default content.
 * @var \WP_Block $block      Block instance.
 */

$date        = $attributes['date'] ?? false;
$date_format = $attributes['dateFormat'] ?? get_option( 'date_format' );

if ( ! empty( $date ) ) {
	$date = strtotime( $attributes['date'] );
}

?>

<div <?php echo get_block_wrapper_attributes(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<time dateTime=<?php echo esc_attr( date_i18n( 'c', $date ) ); ?>>
		<?php echo esc_html( date_i18n( $date_format, $date ) ); ?>
	</time>
</div>
