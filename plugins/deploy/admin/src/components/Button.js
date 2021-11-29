import React from 'react';

const BASE_STYLES = {
    padding: "10px",
    borderRadius: "6px",
    fontWeight: "600",
    border: "2px solid #000",
}

const STYLES = {
    idle: {
        backgroundColor: 'rgb(82, 229, 116)',
        cursor: 'pointer',
    },
    loading: {
        backgroundColor: 'rgb(69, 187, 96)',
        cursor: 'wait',
    },
    disabled: {
        backgroundColor: 'rgb(172, 172, 172)',
        cursor: 'not-allowed',
    },
}

const Button = ({ status, style, children, onClick }) => (
    <button
        disabled={status === 'disabled'}
        onClick={onClick}
        style={{
            ...style,
            ...STYLES[status],
            ...BASE_STYLES,
        }}>
        {children}
    </button>
);

export default Button;

