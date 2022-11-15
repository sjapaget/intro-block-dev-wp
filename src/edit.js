/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import {
  useBlockProps,
  InnerBlocks,
  InspectorControls,
  PanelColorSettings
} from '@wordpress/block-editor';

import {
  PanelBody,
  RangeControl,
  SelectControl
} from '@wordpress/components'

import NumberControl from './components/number-control';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit( { attributes, setAttributes }) {

  const {
    columnCount,
    columnWidth,
    columnGap,
    columnRuleStyle,
    columnRuleWidth,
    columnRuleColor,
    dropCapColor,
    dropCapSize,
    boxShadow,
    boxShadowColor
  } = attributes;
  const columnStyles = {
    columnCount,
    columnWidth,
    columnGap,
    columnRuleStyle,
    columnRuleWidth,
    columnRuleColor,
    '--drop-cap-color': dropCapColor,
    '--drop-cap-font-size': dropCapSize.fontSize,
    '--drop-cap-line-height': dropCapSize.lineHeight,
    '--box-shadow-offset-x': boxShadow.offsetX,
    '--box-shadow-offset-y': boxShadow.offsetY,
    '--box-shadow-blur-radius': boxShadow.blurRadius,
    '--box-shadow-color': boxShadowColor,
  };

  const ALLOWED_BLOCKS = [ 'core/heading', 'core/paragraph', 'core/image', 'core/list', 'core/pullquote', 'core/verse', 'core/audio', 'core/video', 'core/separator' ]

  const TEMPLATE_PARAGRAPHS = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin finibus, lectus non interdum cursus, arcu sapien mollis lacus, et tincidunt odio nisi ut purus. Duis eleifend, magna placerat faucibus tincidunt, orci nulla ornare tortor, eget egestas tortor nunc quis sem. Cras in tortor justo. Nulla consectetur leo vel blandit consectetur. Fusce quis sapien ante. Vestibulum non varius augue, et ultricies urna. Integer hendrerit suscipit nibh.',
    'Interdum et malesuada fames ac ante ipsum primis in faucibus. Cras vestibulum mauris diam. Praesent semper diam a efficitur iaculis. Nullam lacinia augue quis lorem accumsan tempus. Maecenas dapibus velit eu blandit pretium. Nullam posuere ut ipsum in commodo. Fusce fringilla quis turpis a placerat. Etiam hendrerit velit a lacus varius ornare.',
  ]

  const MC_TEMPLATE = [
    [ 'core/heading', { level: 2, placeholder: __( 'Heading...', 'multi-columns' ) } ],
    [ 'core/paragraph', { placeholder: TEMPLATE_PARAGRAPHS[0] } ],
    [ 'core/heading', { level: 4, placeholder: __( 'Sub-heading...', 'multi-columns' ) } ],
    [ 'core/paragraph', { placeholder: TEMPLATE_PARAGRAPHS[1] } ],
  ];

  const onChangeColumnCount =( val ) => {
    setAttributes( { columnCount: val } )
  };

  const onChangeColumnWidth = ( val ) => {
    setAttributes( { columnWidth: Number(val) } )
  };

  const onChangeColumnGap = ( val ) => {
    setAttributes( { columnGap: Number(val) } )
  };

  const onChangeColumnRuleStyle = ( val ) => {
    setAttributes( { columnRuleStyle: val } )
  };

  const onChangeColumnRuleWidth = ( val ) => {
    setAttributes( { columnRuleWidth: Number(val) } )
  };

  const onChangeColumnRuleColor = ( val ) => {
    setAttributes( { columnRuleColor: val } )
  };

  const onChangeDropCapColor = ( val ) => {
    setAttributes( { dropCapColor: val } )
  };

  const onChangeDropCapSize = ( val ) => {
    switch( val ) {
      case 'small':
        setAttributes( {
          dropCapSize: {
            size: 'small',
            fontSize: '3.8rem',
            lineHeight: '3.5rem',
          },
        } );
        break;
      case 'large':
        setAttributes( {
          dropCapSize: {
            size: 'large',
            fontSize: '6.2rem',
            lineHeight: '5.2rem',
          },
        } );
        break;
      default:
        setAttributes( {
          dropCapSize: {
            size: 'small',
            fontSize: '3.8rem',
            lineHeight: '3.5rem',
          },
        } );
    }
  };

  const onChangeBoxShadow= ( val ) => {
    switch( val ) {
      case 'right':
        setAttributes( {
          boxShadow: {
            style: 'right',
            offsetX: "10px",
            offsetY: "5px",
            blurRadius: "5px",
          },
        } );
        break;
        case 'left':
          setAttributes( {
            boxShadow: {
              style: 'left',
              offsetX: "-10px",
              offsetY: "5px",
              blurRadius: "5px",
            },
          } );
          break;
        default:
          setAttributes( {
            boxShadow: {
              style: 'right',
              offsetX: "10px",
              offsetY: "5px",
              blurRadius: "5px",
            },
          } );

    }
  };

  const onChangeBoxShadowColor = ( val ) => {
    setAttributes( { boxShadowColor: val } )
  }

  const colorSettingsDropDown = () => {
    switch (attributes.className) {
      case "is-style-drop-cap":
        return [
          {
            value: columnRuleColor,
            onChange: onChangeColumnRuleColor,
            label: __( 'Separator colour', 'multi-columns' ),
        },
        {
            value: dropCapColor,
            onChange: onChangeDropCapColor,
            label: __( 'Drop Capital Colour', 'multi-columns' ),
        },
      ]
      case 'is-style-box-shadow':
        return [
          {
            value: columnRuleColor,
            onChange: onChangeColumnRuleColor,
            label: __( 'Separator Colour', 'multi-columns' ),
        },
        {
            value: boxShadowColor,
            onChange: onChangeBoxShadowColor,
            label: __( 'Box Shadow Colour', 'multi-columns' ),
        },
        ]
        default:
          return [
            {
              value: columnRuleColor,
              onChange: onChangeColumnRuleColor,
              label: __( 'Separator Colour', 'multi-columns' ),
          },
        ]
    }
  }

	return (
    <>
      <InspectorControls>
        <PanelBody title={ __( 'Column Settings', 'multi-columns' ) }>
          <RangeControl
            label={ __( 'Columns', 'multi-columns' ) }
            value={ columnCount }
            onChange={ onChangeColumnCount }
            min={ 2 }
            max={ 6 }
          />
          <NumberControl
            label={ __( 'Width', 'multi-columns' ) }
            value={ columnWidth }
            onChange={ onChangeColumnWidth }
            min={ 120 }
            max={ 500 }
            step={ 10 }
          />
          <NumberControl
            label={ __( 'Gap', 'multi-columns' ) }
            value={ columnGap }
            onChange={ onChangeColumnGap }
            min={10}
            max={100}
          />
        </PanelBody>
        <PanelBody
          title={ __( 'Column Separator', 'multi-columns' ) }
          initialOpen={ false }
        >
          <SelectControl
            label={ __( 'Separator Style', 'multi-columns' ) }
            onChange={ onChangeColumnRuleStyle }
            options={ [
                {
                  label:  __( 'None', 'multi-columns' ),
                  value: 'none',
                },
                {
                  label: __( 'Solid', 'multi-columns' ),
                  value: 'solid',
                },
                {
                  label: __( 'Dotted', 'multi-columns' ),
                  value: 'dotted'
                },
                {
                label: __( 'Dashed', 'multi-columns' ),
                value: 'dashed',
                },
                {
                  label: __( 'Double', 'multi-columns' ),
                  value: 'double',
                },
                {
                  label: __( 'Groove', 'multi-columns' ),
                  value: 'groove',
                },
                {
                  label: __( 'Ridge', 'multi-columns' ),
                  value: 'ridge',
                },
            ] }
          />
          <NumberControl
            label={ __( 'Rule Width', 'multi-columns' ) }
            value={ columnRuleWidth }
            onChange={ onChangeColumnRuleWidth }
            min={1}
            max={10}
          />
        </PanelBody>

        { attributes.className === "is-style-drop-cap" && <PanelBody title={ __('Drop-Cap', 'multi-column') } initialOpen={ false }>
          <SelectControl
            label={ __('Size', 'multi-column') }
            onChange={ onChangeDropCapSize }
            value={dropCapSize.size}
            options={ [
              {
                label: __('Small', 'multi-column'),
                value: 'small',
              },
              {
                label: __('Large', 'multi-column'),
                value: 'large',
              }
            ] }
          />
        </PanelBody> }

        { attributes.className === "is-style-box-shadow" && <PanelBody title={ __('Box-Shadow', 'multi-columns') } initialOpen={ false }>
          <SelectControl
            label={ __( 'Style', 'multi-column' ) }
            onChange={ onChangeBoxShadow }
            value={ boxShadow.style }
            options={ [
              {
                label: __( 'Right', 'multi-column' ),
                value: 'right'
              },
              {
                label: __( 'Left', 'multi-column' ),
                value: 'left'
              }
            ] }
          />
        </PanelBody>}
        <PanelColorSettings
          title={ __( 'Colour Settings', 'multi-columns' ) }
          initialOpen={ false }
          colorSettings={ colorSettingsDropDown() }
        />
      </InspectorControls>

      <div { ...useBlockProps( { style: columnStyles } ) }>
        <InnerBlocks allowedBlocks={ ALLOWED_BLOCKS } template={ MC_TEMPLATE } />
      </div>
    </>
	);
}
