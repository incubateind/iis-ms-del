export const SAFE_DRIVING = 'c0'
export const TEXTING_RIGHT = 'c1'
export const PHONE_RIGHT = 'c2'
export const TEXTING_LEFT = 'c3'
export const PHONE_LEFT = 'c4'
export const RADIO = 'c5'
export const REACHING_BEHIND = 'c7'
export const HAIR_AND_MAKEUP = 'c8'
export const TALKING_TO_PASSENGER = 'c9'

export const CLASS_LABELS = {
    [SAFE_DRIVING]: 'Safe driving',
    [TEXTING_RIGHT]: 'Texting right',
    [PHONE_RIGHT]: 'Phone right hand',
    [TEXTING_LEFT]: 'Texting left',
    [PHONE_LEFT]: 'Phone left hand',
    [RADIO]: 'Operating the radio',
    [REACHING_BEHIND]: 'Reaching behind',
    [HAIR_AND_MAKEUP]: 'Hair and makeup',
    [TALKING_TO_PASSENGER]: 'Talking to passenger',
}

export const USING_PHONE = 'Using phone'
export const UNDISTRACTED_DRIVING = 'Undistracted driving'

export const CLASS_SHORTENED_DISPLAY_GROUPS = {
    [USING_PHONE]: [TEXTING_RIGHT, TEXTING_LEFT, PHONE_LEFT, PHONE_RIGHT],
    [UNDISTRACTED_DRIVING]: [CLASS_LABELS[SAFE_DRIVING]],
    [CLASS_LABELS[RADIO]]: 0,
    [CLASS_LABELS[REACHING_BEHIND]]: 0,
    [CLASS_LABELS[HAIR_AND_MAKEUP]]: 0,
    [CLASS_LABELS[TALKING_TO_PASSENGER]]: 0,
}

