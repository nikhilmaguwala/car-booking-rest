const themeColors = {
    black: '#000',
    grayDarker: '#394249',
    grayDark: '#434C53',
    gray: '#6D7579',
    grayLight: '#B0B6B8',
    grayLighter: '#D5D9D8',
    audiRed: '#CC0033',
    audiDarkRed: '#AA142D'
}

const ModalStyles = {
    bgcolor: '#434C53',
    '&:hover': {
        bgcolor: '#394249',
    },
    color: 'white',
    position: 'absolute',
    bottom: 20,
    right: 20
}

const addButtonStyles = {
    bgcolor: '#CC0033',
    '&:hover': {
        bgcolor: '#AA142D',
    }
}

export {themeColors, ModalStyles, addButtonStyles}