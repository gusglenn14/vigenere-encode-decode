controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    // Call the Vigenere function, passing in the encryption key, the encrypted image, and "false" to indicate that you want the image to be decrypted.
    Vigenere(password, mySprite, false)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    // Call the Vigenere function, passing in the encryption key, the image to be encrypted, and "true" to indicate that you want the image encrypted.
    Vigenere(password, mySprite, true)
})
function Vigenere (passwordcolors: Sprite, imagemessage: Sprite, encode: boolean) {
    pIndex = 0
    for (let row = 0; row <= imagemessage.height - 1; row++) {
        for (let column = 0; column <= imagemessage.width - 1; column++) {
            if (encode) {
                imagemessage.image.setPixel(column, row, (imagemessage.image.getPixel(column, row) + passwordcolors.image.getPixel(pIndex, 0)) % 16)
            } else {
                imagemessage.image.setPixel(column, row, (imagemessage.image.getPixel(column, row) - passwordcolors.image.getPixel(pIndex, 0) + 16) % 16)
            }
            pIndex += 1
            if (pIndex == passwordcolors.width) {
                pIndex = 0
            }
            pause(1)
        }
    }
}
/**
 * This program uses the Vigenere cipher to encode and decode an image using a pattern of colors as the cipher key.
 */
let pIndex = 0
let password: Sprite = null
let mySprite: Sprite = null
// This is the image to encode or decode
mySprite = sprites.create(img`
    ............3333bb..bb33333.....
    ........3bb31111d3b311d111d33...
    .......3bdd11111dbd11d11111113..
    .......bdddd1111bd11d111dd11113.
    ......3d111dd111b11d111dd33d11d3
    ......3d11111dd1d11d111d11d33113
    ....bb3d111111dd13dd111d1dd3b31b
    ...b3d3dd111111dd13dd11d1dddbbdb
    ...3ddd31d111111dd133dddddddb.b.
    ..311111d1ddd1111dd11dddddd33...
    ..3111111d111dd111dd1111dd3313..
    ..bddd1111ddd11dd111d111111113..
    ..311ddd111dddd11dd11ddd1111ddb.
    ..31111dd111dddd11dd111dddddddb.
    ...bd1111d1113ddd11dd1111111d3b.
    ...4dd1111d1113ddd11ddd111d333b.
    ..4dbdddd11d11133ddddddddddddb..
    .4ddbddddd11d111d33ddddddddd3b..
    .4dddb11ddd11dd111d333dddd3bb...
    .4dd55b111d11dd11111d3333bbb....
    .445555b111d11dddd111111ddb.....
    .4455555bd1d311ddddddddddd3.....
    .45455555bb1d3111ddddddd113.....
    .4554555555b333d1111111113......
    455554555555bbb33d11111d33......
    4d555545555555dbbb3d11d33.......
    4dd5555455555ddddd43333.........
    45dd555544ddddddd4..............
    .45dd5555d44dddd4...............
    ..45dd55dddd4444................
    ...45dd55444....................
    ....44444.......................
    `, SpriteKind.Player)
// This is the "cipher key" to encode and decode the image
password = sprites.create(img`
    b 3 7 3 5 4 2 c 6 7 
    `, SpriteKind.Player)
password.top = 0
game.showLongText("Press A to encrypt the image. Press B to decrypt the image.", DialogLayout.Bottom)
