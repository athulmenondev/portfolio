import React from 'react';
import './GlassSurface.scss';

const GlassSurface = ({
    children,
    width,
    height,
    borderRadius = 20,
    displace = 0.3,
    distortionScale = -100,
    redOffset = 0,
    greenOffset = 5,
    blueOffset = 10,
    brightness = 60,
    opacity = 0.9,
    mixBlendMode = 'normal',
    className = '',
    style = {}
}) => {
    const svgId = `distortion-${Math.random().toString(36).substr(2, 9)}`;

    const inlineStyle = {
        width: width ? `${width}px` : undefined,
        height: height ? `${height}px` : undefined,
        borderRadius: `${borderRadius}px`,
        opacity,
        mixBlendMode,
        ...style
    };

    return (
        <div className={`glass-surface ${className}`} style={inlineStyle}>
            <svg className="glass-surface-filter">
                <defs>
                    <filter id={svgId} x="-50%" y="-50%" width="200%" height="200%">
                        {/* Turbulence for displacement */}
                        <feTurbulence
                            type="fractalNoise"
                            baseFrequency="0.01"
                            numOctaves="3"
                            result="noise"
                        />
                        
                        {/* Displacement map */}
                        <feDisplacementMap
                            in="SourceGraphic"
                            in2="noise"
                            scale={distortionScale}
                            xChannelSelector="R"
                            yChannelSelector="G"
                            result="displaced"
                        />

                        {/* Color channel offsets for chromatic aberration */}
                        <feOffset in="displaced" dx={redOffset} dy={redOffset} result="offsetRed" />
                        <feOffset in="displaced" dx={greenOffset} dy={greenOffset} result="offsetGreen" />
                        <feOffset in="displaced" dx={blueOffset} dy={blueOffset} result="offsetBlue" />

                        {/* Combine color channels */}
                        <feComponentTransfer in="offsetRed" result="redChannel">
                            <feFuncR type="identity" />
                            <feFuncG type="discrete" tableValues="0" />
                            <feFuncB type="discrete" tableValues="0" />
                        </feComponentTransfer>

                        <feComponentTransfer in="offsetGreen" result="greenChannel">
                            <feFuncR type="discrete" tableValues="0" />
                            <feFuncG type="identity" />
                            <feFuncB type="discrete" tableValues="0" />
                        </feComponentTransfer>

                        <feComponentTransfer in="offsetBlue" result="blueChannel">
                            <feFuncR type="discrete" tableValues="0" />
                            <feFuncG type="discrete" tableValues="0" />
                            <feFuncB type="identity" />
                        </feComponentTransfer>

                        {/* Merge channels */}
                        <feBlend in="redChannel" in2="greenChannel" mode="screen" result="rg" />
                        <feBlend in="rg" in2="blueChannel" mode="screen" result="rgb" />

                        {/* Brightness adjustment */}
                        <feComponentTransfer in="rgb" result="brightened">
                            <feFuncR type="linear" slope={brightness / 100} />
                            <feFuncG type="linear" slope={brightness / 100} />
                            <feFuncB type="linear" slope={brightness / 100} />
                        </feComponentTransfer>

                        {/* Blur for glass effect */}
                        <feGaussianBlur in="brightened" stdDeviation="2" result="blurred" />
                    </filter>
                </defs>
            </svg>
            
            <div 
                className="glass-surface-content"
                style={{ filter: `url(#${svgId})` }}
            >
                {children}
            </div>
        </div>
    );
};

export default GlassSurface;
