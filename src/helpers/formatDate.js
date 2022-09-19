const padTo2Digits = num => num.toString().padStart( 2, '0' );

export const formatDate = date => {

    const hours = padTo2Digits( date.getHours() );
    const minutes = padTo2Digits( date.getMinutes() );
    const day = padTo2Digits( date.getDate() );
    const month = padTo2Digits( date.getMonth() + 1 );
    const year = date.getFullYear();

    return `${ hours }:${ minutes } - ${ day }/${ month }/${ year }`;

}