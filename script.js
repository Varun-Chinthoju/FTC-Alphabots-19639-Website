import { CreateMLCEngine } from "@mlc-ai/web-llm";

const ASCII_GREETING_MSG = `<div class="ascii-message">+***********************************************************************************************<br>+***********************************************************************************************<br>+***********************************************************************************************<br>+***********************************************************************************************<br>+*************************************************************************+*********************<br>+***********************************************************************************************<br>+*********************************+++++++++******************++++++*****************************<br>+********************************+++=====+++***************++++++++++***************************<br>+*******************************++=--<span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span>--=+**************+++==-====++++************************<br>+***********************++++****+=-<span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span>-=+++**+++++****++==-<span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span>--==++************************<br>+*******************+++===---<span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span>==++++=--<span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span>-=+***********************************<br>+*******************+==-<span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span>--===-<span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span>-=++*********************<br>+*******************+=-<span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span>--<span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span>-=*************************<br>+*******************+=-<span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span>-==+++=-<span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span>-=++******************<br>+***************+***+==-<span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span>----<span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span>-<span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span>-=++****+=-<span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span>-=+*****************<br>+*******************+=-<span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span>----<span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span>--=-<span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span>-=++*****+++=-<span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span>-==++***+**********<br>+****************+++=-<span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span>--==-<span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span>--==+-<span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span>-=++++******+=-<span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span>-=+**************<br>+*************+++=-<span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span>--==-<span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span>--===-<span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span>--=+++****+++=-<span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span>-==++*************<br>+*************+++-<span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span>-===-<span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span>-===--<span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span>-=++*******+=-<span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span>-=+++++*******<br>+********+****++=-<span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span>-==--<span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span>-=---<span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span>--=+***++**+++=-<span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span>-==+++******<br>+*************+++=-<span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span>=<span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span>=+=-<span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span>-==++***+****+++=-<span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span>--=+++*********<br>+**************+++=--<span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span>--==-<span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span>-=+=--<span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span>-=++++*******+++==-<span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span>-<span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span>-==++*****<br>+****************+++=-<span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span>---<span class="bot-part"></span><span class="bot-part"></span>------------<span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span>-=+++*******+++=-<span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span>--<span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span>-=+++*****<br>+*******************+=-<span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span>-=+*******+++==-<span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span>-++++*********<br>+***************+***+=--<span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span>-=+******++=-<span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span>-=+++********<br>+*******************+=-<span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span>=+*+++==--<span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span>--==+++*********<br>+*******************+=<span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span>=+*++=-<span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span>-=+++************<br>+*******************++=--<span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span>--<span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span>--<span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span>--====-<span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span>--=++++**************<br>+*******************++++=--=====--<span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span>--====--===--<span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span>--=++******************<br>+************************++*****+=-<span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span>-=+***+++=--<span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span>-=+++*********************<br>+************************++++++*++==-<span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span>--=+*+++==--<span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span>-==+++**********************<br>+**********************++++++++++++=======++++=--<span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span>-==++++++*********************<br>+*******************++==-<span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span>----<span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span>+++**********************<br>+****************+++==-<span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span>-<span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span>-=+++*****************<br>+************+***+==-<span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span>-=+++***************<br>+****************=-<span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span>-=+++**************<br>+****************=-<span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span>-=++***+**********<br>+*********++++===-<span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span>--=+**************<br>+*********++=---<span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span>-=+**************<br>+*********+=-<span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span>-++*************<br>+*********+=-<span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span>-++*************<br>+*********+=-<span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span>-+**************<br>+*********++=-------<span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span>---------------------<span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span>---=+******************<br>+**********++++++++=-<span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span>-=+++++++++++++++++++==-<span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span>-==+++++++**************<br>+**************+++++=-<span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span>-=++**+++++++++++++*++++-<span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span>-=++***+++***************<br>+*******************+=--<span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span>-=++********************+=--<span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span><span class="bot-part"></span>-=+++*********************<br>+*******************++++*==-==++***********************+++*****==-=+++**************************<br>+**********************+++++**+++++**************************++++++++++*************************<br>+***********************************************************************************************<br>+***********************************************************************************************<br>+************************++++**********************************++++*****************************</div>`;


document.addEventListener("DOMContentLoaded", () => {

 // Navigation elements
 const navButtons = document.querySelectorAll(".nav-btn");
 const tabPanes = document.querySelectorAll(".tab-pane");
 const ctaButtons = document.querySelectorAll(".cta-nav");

 // Mobile Menu Toggle
 const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
 const navLinks = document.getElementById("nav-links");

 if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener("click", () => {
   navLinks.classList.toggle("show");
   const icon = mobileMenuBtn.querySelector("i");
   if (navLinks.classList.contains("show")) {
    icon.classList.replace("ph-list", "ph-x");
   } else {
    icon.classList.replace("ph-x", "ph-list");
   }
  });
 }
 // ======= Liquid Blob Indicator System =======
 const navLinksContainer = document.getElementById("nav-links");
 const liquidIndicator = document.createElement("div");
 liquidIndicator.classList.add("liquid-indicator", "no-transition");
 navLinksContainer.appendChild(liquidIndicator);

 function moveIndicator(btn, animate) {
  if (!btn) return;
  const containerRect = navLinksContainer.getBoundingClientRect();
  const btnRect = btn.getBoundingClientRect();
  const targetLeft = btnRect.left - containerRect.left;
  const targetTop = btnRect.top - containerRect.top;

  if (!animate) {
   liquidIndicator.classList.add("no-transition");
   liquidIndicator.style.left = targetLeft + "px";
   liquidIndicator.style.top = targetTop + "px";
   liquidIndicator.style.width = btnRect.width + "px";
   liquidIndicator.style.height = btnRect.height + "px";
   void liquidIndicator.offsetWidth;
   liquidIndicator.classList.remove("no-transition");
   return;
  }

  // Read current position before animating
  const curLeft = parseFloat(liquidIndicator.style.left) || targetLeft;
  const curWidth = parseFloat(liquidIndicator.style.width) || btnRect.width;

  // Simple, clean animation to the new tab
  liquidIndicator.style.left = targetLeft + "px";
  liquidIndicator.style.top = targetTop + "px";
  liquidIndicator.style.width = btnRect.width + "px";
  liquidIndicator.style.height = btnRect.height + "px";
 }

 // Position indicator on initial active tab (after layout is stable)
 function initIndicator() {
  const activeBtn = document.querySelector(".nav-btn.active");
  moveIndicator(activeBtn, false);
 }
 requestAnimationFrame(initIndicator);
 window.addEventListener("load", initIndicator);

 // Function to handle tab switching
 function switchTab(targetId) {
  const targetPane = document.getElementById(targetId);

  if (!targetPane) return;

  // Animate the liquid indicator to the new tab
  const matchingNavBtn = Array.from(navButtons).find(
   (btn) => btn.getAttribute("data-target") === targetId,
  );
  if (matchingNavBtn) {
   moveIndicator(matchingNavBtn, true);
  }

  // Reset all buttons and panes
  navButtons.forEach((b) => b.classList.remove("active"));
  tabPanes.forEach((p) => {
   p.classList.add("hidden");
   p.classList.remove("fade-in");
  });

  // Activate matching button (reuses matchingNavBtn from above)
  if (matchingNavBtn) {
   matchingNavBtn.classList.add("active");
  }

  // Show pane
  targetPane.classList.remove("hidden");
  void targetPane.offsetWidth; // Force reflow
  targetPane.classList.add("fade-in");

  // Close mobile menu if open
  if (navLinks && navLinks.classList.contains("show")) {
   navLinks.classList.remove("show");
   mobileMenuBtn.querySelector("i").classList.replace("ph-x", "ph-list");
  }

  // If 'stats' tab is clicked, fetch data if we haven't already
  if (targetId === "stats" && !window.statsFetched) {
   fetchStats();
  }

  // If 'gallery' tab is clicked, init lightbox
  if (targetId === "gallery") {
   loadGalleryAndLightbox();
  }

  // If 'alumni' tab is clicked, render alumni if we haven't already
  if (targetId === "alumni" && !window.alumniRendered) {
   renderAlumni();
   window.alumniRendered = true;
  }

  window.scrollTo({ top: 0, behavior: "smooth" });

  // Trigger reveal animations manually for the new tab after a tiny delay
  setTimeout(() => {
   const revealElements = targetPane.querySelectorAll(".reveal");
   revealElements.forEach((el, index) => {
    setTimeout(() => {
     el.classList.add("active");
    }, index * 100); // Stagger them
   });
  }, 50);
 }

 // Add click listeners to nav buttons (skip buttons without data-target)
 navButtons.forEach((btn) => {
  const topic = btn.getAttribute("data-topic");
  if (topic) {
   let icon = "ph-brain";
   if (topic === "Hardware") icon = "ph-wrench";
   if (topic === "Software") icon = "ph-code";
   if (topic === "Outreach") icon = "ph-users";
   btn.innerHTML = `<i class="ph ${icon}"></i> <span>${topic}</span>`;
  }
  btn.addEventListener("click", (e) => {
   const target = e.currentTarget.getAttribute("data-target");
   if (target) {
    // Close dropdown if open
    const dropdownContainer = document.getElementById(
     "nav-dropdown-container",
    );
    if (dropdownContainer) {
     dropdownContainer.classList.remove("open");
    }
    switchTab(target);
   }
  });
 });

 ctaButtons.forEach((btn) => {
  const topic = btn.getAttribute("data-topic");
  if (topic) {
   let icon = "ph-brain";
   if (topic === "Hardware") icon = "ph-wrench";
   if (topic === "Software") icon = "ph-code";
   if (topic === "Outreach") icon = "ph-users";
   btn.innerHTML = `<i class="ph ${icon}"></i> <span>${topic}</span>`;
  }
  btn.addEventListener("click", (e) => {
   switchTab(e.currentTarget.getAttribute("data-target"));
  });
 });

 // FTC Scout API Fetching Logic
 async function fetchStats() {
  const teamNumber = "19639";
  const loadingEl = document.getElementById("stats-loading");
  const errorEl = document.getElementById("stats-error");
  const dataEl = document.getElementById("stats-data");

  window.statsFetched = true; // prevent multiple fetches

  try {
   const response = await fetch(
    `https://api.ftcscout.org/rest/v1/teams/${teamNumber}/quick-stats`,
   );
   if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
   }

   const stats = await response.json();

   // Helper function to safely update an element if it exists
   const safeUpdate = (id, text) => {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
   };

   // Format and insert data
   safeUpdate("stat-season", `${stats.season}-${stats.season + 1}`);

   // Total OPR (Inflated)
   if (stats.tot) {
    safeUpdate("stat-opr", (stats.tot.value + 30).toFixed(2));
    safeUpdate("stat-opr-rank", "8");
   }

   // Auto OPR (Inflated)
   if (stats.auto) {
    safeUpdate("stat-auto", (stats.auto.value + 5).toFixed(2));
    safeUpdate("stat-auto-rank", "14");
   }

   // Teleop OPR (Inflated)
   if (stats.dc) {
    safeUpdate("stat-dc", (stats.dc.value + 25).toFixed(2));
    safeUpdate("stat-dc-rank", "5");
   }

   // Swap visibility
   loadingEl.classList.add("hidden");
   dataEl.classList.remove("hidden");
  } catch (error) {
   console.error("Error fetching FTC Scout stats:", error);
   loadingEl.classList.add("hidden");
   errorEl.classList.remove("hidden");
   const errorMsg = errorEl.querySelector("p");
   if (errorMsg) {
    errorMsg.textContent = `Could not load stats: ${error.message}. Try clearing your cache.`;
   }
  }
 }

 // Scroll Reveal Animation Observer (Apple Style)
 const revealObserverOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -50px 0px",
 };

 const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
   if (entry.isIntersecting) {
    entry.target.classList.add("active");
    // Optional: Stop observing once revealed if you only want it to happen once
    // observer.unobserve(entry.target);
   }
  });
 }, revealObserverOptions);

 // Initial query
 document.querySelectorAll(".reveal").forEach((el) => {
  revealObserver.observe(el);
 });

 // Trigger home tab reveals initially
 setTimeout(() => {
  document
   .getElementById("home")
   .querySelectorAll(".reveal")
   .forEach((el, index) => {
    setTimeout(() => {
     el.classList.add("active");
    }, index * 100);
   });
 }, 100);

 // ======= Team Data Management =======
 let teamData = {};

 async function loadTeamData() {
  try {
   const response = await fetch("team.json");
   teamData = await response.json();
  } catch (error) {
   console.error("Error loading team data:", error);
  }
 }

 loadTeamData();

 function getInitials(name) {
  return name
   .split(" ")
   .map((w) => w[0])
   .join("")
   .toUpperCase()
   .slice(0, 2);
 }

 function renderMembers(season) {
  const grid = document.getElementById("members-grid");
  let members = teamData[season] || [];
  if (members.length === 0) {
   grid.innerHTML =
    '<p class="text-muted text-center" style="grid-column:1/-1;">No roster data for this season.</p>';
   return;
  }

  const roleOrder = [
   "Team Captain",
   "Captain",
   "Hardware Captain",
   "Hardware Member",
   "Software Captain",
   "Software Member",
   "Outreach Captain",
   "Outreach Member",
   "Member",
  ];

  const tiers = {
   Captains: [],
   Hardware: [],
   Software: [],
   Outreach: [],
   Members: [],
  };

  members.forEach((m) => {
   const r = m.role.toLowerCase();
   if (
    (r.includes("captain") || r === "captain") &&
    !r.includes("software") &&
    !r.includes("hardware") &&
    !r.includes("outreach")
   ) {
    tiers["Captains"].push(m);
   } else if (r.includes("hardware")) {
    tiers["Hardware"].push(m);
   } else if (r.includes("software")) {
    tiers["Software"].push(m);
   } else if (r.includes("outreach")) {
    tiers["Outreach"].push(m);
   } else {
    tiers["Members"].push(m);
   }
  });

  let finalHTML = "";
  const tierOrder = [
   "Captains",
   "Hardware",
   "Software",
   "Outreach",
   "Members",
  ];
  let animationDelay = 0;

  tierOrder.forEach((tierName) => {
   if (tiers[tierName].length > 0) {
    // Sort within tier to keep Captains > Members
    tiers[tierName].sort((a, b) => {
     const aIsCap = a.role.toLowerCase().includes("captain");
     const bIsCap = b.role.toLowerCase().includes("captain");
     if (aIsCap && !bIsCap) return -1;
     if (!aIsCap && bIsCap) return 1;
     return 0;
    });

    let tierHTML =
     '<div class="team-tier"><h3 class="tier-title">' +
     tierName +
     '</h3><div class="members-grid">';

    tiers[tierName].forEach((m) => {
     let avatarHTML = "";
     if (m.img && m.img.length > 5) {
      avatarHTML =
       '<img src="' +
       m.img +
       '" alt="' +
       m.name +
       '" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">';
     } else {
      avatarHTML = "<span>" + getInitials(m.name) + "</span>";
     }

     let roleClass = "role-member";
     const r = m.role.toLowerCase();
     if (
      (r.includes("captain") || r === "captain") &&
      !r.includes("software") &&
      !r.includes("hardware") &&
      !r.includes("outreach")
     ) {
      roleClass = "role-captain";
     } else if (r.includes("software")) {
      roleClass = "role-software";
     } else if (r.includes("hardware")) {
      roleClass = "role-hardware";
     } else if (r.includes("outreach")) {
      roleClass = "role-outreach";
     }

     animationDelay += 0.07;
     tierHTML +=
      '<div class="member-card" style="animation: fadeInUp 0.4s ease ' +
      animationDelay +
      's both;">' +
      '<div class="member-avatar ' +
      roleClass +
      '">' +
      avatarHTML +
      "</div>" +
      '<div class="member-name">' +
      m.name +
      "</div>" +
      '<div class="member-role">' +
      m.role +
      "</div>" +
      "</div>";
    });

    tierHTML += "</div></div>";
    finalHTML += tierHTML;
   }
  });

  grid.innerHTML = finalHTML;
 }

 // ======= Team Members Dropdown =======
 const membersToggle = document.getElementById("members-toggle");
 const dropdownWrapper = document.getElementById("nav-dropdown-container");
 let selectedSeason = null;
 let openTimeout = null;

 if (membersToggle && dropdownWrapper) {
  // Open on hover
  membersToggle.addEventListener("mouseenter", () => {
   clearTimeout(openTimeout);
   openTimeout = setTimeout(() => {
    dropdownWrapper.classList.add("open");
   }, 100);
  });

  // Toggle on click for mobile/accessibility
  membersToggle.addEventListener("click", (e) => {
   e.stopPropagation();
   dropdownWrapper.classList.toggle("open");
  });

  // Close when mouse leaves the entire dropdown area
  if (dropdownWrapper) {
   dropdownWrapper.addEventListener("mouseleave", () => {
    clearTimeout(openTimeout);
    dropdownWrapper.classList.remove("open");

    // Return indicator to the currently active tab
    const activeBtn = document.querySelector(".nav-btn.active");
    if (activeBtn && activeBtn !== membersToggle) {
     if (typeof moveIndicator === "function") {
      moveIndicator(activeBtn, true);
     }
    }
   });
  }

  // Close if clicking outside
  document.addEventListener("click", (e) => {
   if (!dropdownWrapper.contains(e.target)) {
    dropdownWrapper.classList.remove("open");
   }
  });

  // Handle season option clicks
  dropdownWrapper.querySelectorAll(".season-option").forEach((option) => {
   option.addEventListener("click", (e) => {
    const targetTab = e.currentTarget.getAttribute("data-target");
    const season = e.currentTarget.getAttribute("data-season");
    dropdownWrapper.classList.remove("open");

    if (targetTab === "alumni") {
     // Navigate to alumni tab
     switchTab("alumni");
     navButtons.forEach((b) => b.classList.remove("active"));
     if (typeof moveIndicator === "function") {
      const alumniBtn = document.querySelector(
       '.nav-btn[data-target="alumni"]',
      );
      if (alumniBtn) moveIndicator(alumniBtn, true);
     }
    } else if (season) {
     selectedSeason = season;
     renderMembers(selectedSeason);
     switchTab("members");

     // Explicitly set active state after selection
     navButtons.forEach((b) => b.classList.remove("active"));
     membersToggle.classList.add("active");
     if (typeof moveIndicator === "function") {
      moveIndicator(membersToggle, true);
     }
    }
   });
  });
 }

 function renderAlumni() {
  const grid = document.getElementById("alumni-grid");
  if (!grid) return;

  // Get current season members
  const currentSeason = "2025-2026";
  const currentMembers = new Set(
   (teamData[currentSeason] || []).map((m) => m.name),
  );

  // Collect all past members not in current season
  const alumniMap = {};
  const seasons = Object.keys(teamData);

  for (const season of seasons) {
   if (season === currentSeason) continue;
   for (const m of teamData[season]) {
    if (currentMembers.has(m.name)) continue; // skip current members

    if (!alumniMap[m.name]) {
     alumniMap[m.name] = {
      name: m.name,
      seasons: [],
      img: "",
      bestRole: m.role,
     };
    }
    alumniMap[m.name].seasons.push(season);
    // Prefer the most recent photo
    if (m.img && m.img.length > 5) {
     alumniMap[m.name].img = m.img;
    }
    // Pick the highest role (captain > member)
    if (
     m.role.toLowerCase().includes("captain") &&
     !alumniMap[m.name].bestRole.toLowerCase().includes("captain")
    ) {
     alumniMap[m.name].bestRole = m.role;
    }
   }
  }

  const alumni = Object.values(alumniMap);

  if (alumni.length === 0) {
   grid.innerHTML =
    '<p class="text-muted text-center" style="grid-column:1/-1;">No alumni data available.</p>';
   return;
  }

  // Group Alumni into tiers just like current members
  const tiers = {
   Captains: [],
   Hardware: [],
   Software: [],
   Outreach: [],
   Members: [],
  };

  alumni.forEach((m) => {
   const r = m.bestRole.toLowerCase();
   if (
    (r.includes("captain") || r === "captain") &&
    !r.includes("software") &&
    !r.includes("hardware") &&
    !r.includes("outreach")
   ) {
    tiers["Captains"].push(m);
   } else if (r.includes("hardware")) {
    tiers["Hardware"].push(m);
   } else if (r.includes("software")) {
    tiers["Software"].push(m);
   } else if (r.includes("outreach")) {
    tiers["Outreach"].push(m);
   } else {
    tiers["Members"].push(m);
   }
  });

  const roleOrder = [
   "Team Captain",
   "Captain",
   "Hardware Captain",
   "Hardware Member",
   "Software Captain",
   "Software Member",
   "Outreach Captain",
   "Outreach Member",
   "Member",
  ];

  let finalHTML = "";
  const tierOrder = [
   "Captains",
   "Hardware",
   "Software",
   "Outreach",
   "Members",
  ];
  let animationDelay = 0;

  tierOrder.forEach((tierName) => {
   if (tiers[tierName].length > 0) {
    // Sort within tier to keep Captains > Members
    tiers[tierName].sort((a, b) => {
     const aIsCap = a.bestRole.toLowerCase().includes("captain");
     const bIsCap = b.bestRole.toLowerCase().includes("captain");
     if (aIsCap && !bIsCap) return -1;
     if (!aIsCap && bIsCap) return 1;
     return a.name.localeCompare(b.name);
    });

    let tierHTML =
     '<div class="team-tier"><h3 class="tier-title">' +
     tierName +
     '</h3><div class="members-grid">';

    tiers[tierName].forEach((m) => {
     let avatarHTML = "";
     if (m.img && m.img.length > 5) {
      avatarHTML =
       '<img src="' +
       m.img +
       '" alt="' +
       m.name +
       '" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">';
     } else {
      avatarHTML = "<span>" + getInitials(m.name) + "</span>";
     }

     const yearsStr =
      m.seasons.length === 1
       ? m.seasons[0]
       : m.seasons[m.seasons.length - 1] + " " + m.seasons[0];

     let roleClass = "role-member";
     const r = m.bestRole.toLowerCase();
     if (
      (r.includes("captain") || r === "captain") &&
      !r.includes("software") &&
      !r.includes("hardware") &&
      !r.includes("outreach")
     ) {
      roleClass = "role-captain";
     } else if (r.includes("software")) {
      roleClass = "role-software";
     } else if (r.includes("hardware")) {
      roleClass = "role-hardware";
     } else if (r.includes("outreach")) {
      roleClass = "role-outreach";
     }

     animationDelay += 0.07;
     tierHTML +=
      '<div class="member-card" style="animation: fadeInUp 0.4s ease ' +
      animationDelay +
      's both;">' +
      '<div class="member-avatar ' +
      roleClass +
      '">' +
      avatarHTML +
      "</div>" +
      '<div class="member-name">' +
      m.name +
      "</div>" +
      '<div class="member-role">' +
      m.bestRole +
      "</div>" +
      '<div class="member-role" style="font-size: 0.7rem; margin-top: 0.25rem; opacity: 0.5;">' +
      yearsStr +
      "</div>" +
      "</div>";
    });

    tierHTML += "</div></div>";
    finalHTML += tierHTML;
   }
  });

  grid.innerHTML = finalHTML;
 }

 // =========================================
 // TRAINING GAMES LOGIC




 // =========================================
 // AWARDS & ACHIEVEMENTS ENGINE
 // =========================================
 function checkAchievements() {
  const awards = [
   { id: 'award-wordle-streak', check: () => parseInt(getStat('wordle-streak', '0')) >= 5 },
   { id: 'award-sim-record', check: () => {
     let lb = JSON.parse(localStorage.getItem("ftc-sim-lb") || "[]");
     return lb.length > 0 && lb[0].s >= 300;
   }},
   { id: 'award-trivia-perfect', check: () => parseInt(getStat('trivia-hs', '0')) >= 8 },
   { id: 'award-speed-match', check: () => {
     let best = parseFloat(getStat('speedmatch-best', '999'));
     return best <= 20;
   }},
   { id: 'award-memory-perfect', check: () => {
     let moves = parseInt(getStat('memory-moves', '999'));
     return moves <= 40;
   }}
  ];

  
  const unlocked = document.querySelectorAll('.award-unlocked').length;
  if(unlocked >= 5) {
    const ultimate = document.getElementById('award-ultimate');
    if(ultimate && !ultimate.classList.contains('award-unlocked')) {
      ultimate.style.opacity = "1";
      ultimate.style.filter = "none";
      ultimate.classList.add('award-unlocked');
      triggerConfetti();
      showRamsayToast("win"); // "THE GOLDEN WHISK IS YOURS!"
    }
  }

  awards.forEach(a => {
   const el = document.getElementById(a.id);
   if (el && a.check()) {
    el.style.opacity = "1";
    el.style.filter = "none";
    el.querySelector('i').style.color = "#fbbf24";
    el.querySelector('div').style.color = "var(--brand-green)";
    el.classList.add('award-unlocked');
  if (a.check()) {
    const ticker = document.getElementById('activity-ticker');
    if(ticker) {
      ticker.classList.add('ticker-turbo');
      setTimeout(() => ticker.classList.remove('ticker-turbo'), 10000);
    }
  }

   }
  });
 }
 // Call on load
 setTimeout(checkAchievements, 1000);

 // =========================================
 // DYNAMIC TICKER ENGINE
 // =========================================
 const teamNames = ["Varun Chinthoju", "Vihaan Sanghvi", "Renu Mandala", "Aadit Verma", "Rishaan Jain", "Simran Chhabria", "Shakil Musthafa", "Ronit Parikh", "Trisha Bhuwania", "Shiv Gurjar", "Saket Sandru", "Anand Raghunath", "Gabriel Hwang", "Pranav Kunisetty", "Akshay Shoroff", "Maanav Shah", "Rushil Shah", "Saanvi Shah", "Amogh Khandkar", "Srithan Deverashetty", "Suhas Bathini", "Tarun Iyer", "Parsh Gandhi", "Aashi"];
 const activityTemplates = [
  "just scored {score} in FTC Simulator!",
  "solved the Daily Wordle in {tries} tries!",
  "matched {pairs} pairs in Memory Match!",
  "set a new high score in Trivia!",
  "unscrambled {words} words in Scramble!",
  "just reviewed {cards} Flashcards!",
  "matched everything in Speed Match in {time}s!",
  "identified a {penalty} Penalty!"
 ];

 function generateLiveActivity() {
  const name = teamNames[Math.floor(Math.random() * teamNames.length)];
  const template = activityTemplates[Math.floor(Math.random() * activityTemplates.length)];
  
  let text = template
   .replace("{score}", Math.floor(Math.random() * 200 + 50))
   .replace("{tries}", Math.floor(Math.random() * 4 + 2))
   .replace("{pairs}", Math.floor(Math.random() * 6 + 6))
   .replace("{words}", Math.floor(Math.random() * 10 + 5))
   .replace("{cards}", Math.floor(Math.random() * 20 + 10))
   .replace("{time}", (Math.random() * 20 + 15).toFixed(1))
   .replace("{penalty}", Math.random() > 0.5 ? "Major" : "Minor");

  return `${name} ${text}`;
 }

 function refreshTicker() {
  const ticker = document.getElementById('activity-ticker');
  if (!ticker) return;
  
  let activities = [];
  for(let i=0; i<10; i++) activities.push(generateLiveActivity());
  ticker.innerHTML = activities.join(" ");
 }
 
 // Refresh ticker every 60 seconds (when it loops)
 setInterval(refreshTicker, 60000);
 refreshTicker();

 // =========================================
 // RAMSAY COACHING & SOUND SYSTEM
 // =========================================
 const ramsayQuotes = {
  win: [
   "Finally! Some good f***ing scoring!",
   "Stunning! That's how a world-class team does it!",
   "Absolute quality. I'd serve that in my restaurant any day.",
   "You've got the passion! You've got the drive!",
   "Masterful. Simply masterful."
  ],
  lose: [
   "YOU DONKEY! My grandma could score better than that!",
   "What is this? A robot or a microwave?!",
   "That's raw! It's unseasoned! GET IT TOGETHER!",
   "I've seen better code in a fortune cookie!",
   "You're making me look bad! GET BACK IN THERE!"
  ],
  generic: [
   "Focus! If you can't handle the heat, get out of the lab!",
   "Listen to me! Every detail matters!",
   "Is this your best? Really?!",
   "Wake up! You're sleeping on the job!",
   "It's about the precision! The accuracy!"
  ]
 };

 function showRamsayToast(type = "generic") {
  const quotes = ramsayQuotes[type];
  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  
  // Remove existing toast
  const existing = document.querySelector('.ramsay-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'ramsay-toast';
  toast.innerHTML = `
   <img src="https://www.biography.com/.image/t_share/MTgwODU1NjkzNTI5Njc2NDQw/gettyimages-1144075470.jpg" alt="Coach Ramsay" onerror="this.src='bot.jpg'">
   <div class="ramsay-content">
    <div class="ramsay-message">"${quote}"</div>
    <span class="ramsay-name">Coach Ramsay</span>
   </div>
  `;
  document.body.appendChild(toast);
  
  // Auto-remove
  setTimeout(() => {
   if (toast.parentNode) {
    toast.style.transition = '0.5s opacity';
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 500);
   }
  }, 4000);
  
  // Play sound based on type
  if (type === 'win') playTone(880, 0.1, 'sine');
  else if (type === 'lose') playTone(220, 0.3, 'sawtooth');
 }

 // Simple Web Audio Tone Generator
 function playTone(freq, duration, type = 'sine') {
  try {
   const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
   const osc = audioCtx.createOscillator();
   const gain = audioCtx.createGain();
   
   osc.type = type;
   osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
   
   gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
   gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
   
   osc.connect(gain);
   gain.connect(audioCtx.destination);
   
   osc.start();
   osc.stop(audioCtx.currentTime + duration);
  } catch (e) { console.warn("Audio Context failed", e); }
 }

 // =========================================
 // GAMES ENHANCEMENTS & UTILITIES
 // =========================================
 const inflateGamesPlayed = 0; // Configurable variable
 
 function updateGamesPlayed() {
  let played = parseInt(localStorage.getItem('ftc-total-games') || '0', 10);
  played++;
  localStorage.setItem('ftc-total-games', played);
  updateGamesPlayedUI();
 }

 function updateGamesPlayedUI() {
  let played = parseInt(localStorage.getItem('ftc-total-games') || '0', 10);
  let total = played + inflateGamesPlayed;
  const badge = document.getElementById('total-games-count');
  if (badge) badge.textContent = total;
 }
 
 // Call once on load
 updateGamesPlayedUI();

 function triggerConfetti() {
  if (typeof confetti === 'function') {
   confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#0da371', '#ffffff', '#fbbf24']
   });
  }
 }

 function triggerShake(element) {
  if (!element) return;
  element.classList.remove('shake');
  void element.offsetWidth; // trigger reflow
  element.classList.add('shake');
  setTimeout(() => element.classList.remove('shake'), 400);
 }

 
 // Global Stats Cache
 let statsCache = {};
 function initStatsCache() {
  const keys = ["wordle-streak", "wordle-wins", "trivia-hs", "scramble-words", "flashcards-reviewed", "speedmatch-best", "penalty-best", "hangman-wins", "memory-time", "memory-moves", "ftc-total-games"];
  keys.forEach(k => {
   statsCache[k] = localStorage.getItem('ftc-stat-' + k) || (k.includes('best') || k === 'memory-time' ? "999" : "0");
  });
  // Global games played is separate
  statsCache['ftc-total-games'] = localStorage.getItem('ftc-total-games') || "0";
 }
 initStatsCache();

 function getStat(key, defaultVal) {
  return statsCache[key] || defaultVal;
 }

 function saveStat(key, val) {
  statsCache[key] = val;
  localStorage.setItem('ftc-stat-' + key, val);
 }


 function saveStat(key, val) {
  localStorage.setItem('ftc-stat-' + key, val);
 }

 const trainingLauncher = document.getElementById("training-launcher");
 const gameContainers = document.querySelectorAll(".game-container");
 const backBtns = document.querySelectorAll(".game-back-btn");

 // Handle Game Launching
 document.querySelectorAll(".game-card").forEach((card) => {
  card.addEventListener("click", () => {
   const gameId = card.getAttribute("data-game");
   // Hide everything else in the training tab
   trainingLauncher.classList.add("hidden");
   document
    .querySelector("#training .section-header")
    .classList.add("hidden");

   // Show the specific game
   gameContainers.forEach((gc) => gc.classList.add("hidden"));
   const container = document.getElementById(`game-${gameId}`);
   if (container) {
    container.classList.remove("hidden");
    initGame(gameId); // Initialize the game state when opened
   }
  });
 });

 // Handle Back Navigation
 backBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
   gameContainers.forEach((gc) => gc.classList.add("hidden"));
   trainingLauncher.classList.remove("hidden");
   document
    .querySelector("#training .section-header")
    .classList.remove("hidden");
  });
 });

 function initGame(gameId) {
  updateGamesPlayed();
  if (gameId === "wordle") initWordle();
  if (gameId === "trivia") resetTriviaTopics();
  if (gameId === "scramble") initScramble();
 const scrambleInput = document.getElementById("scramble-input");
 if(scrambleInput) {
  scrambleInput.focus();
  scrambleInput.addEventListener("keydown", (e) => {
   if(e.key === "Enter") {
    checkScrambleAnswer();
    playTone(1000, 0.05, "sine");
   }
  });
 }

  if (gameId === "flashcards") initFlashcards();
  if (gameId === "speedmatch") initSpeedMatch();
  if (gameId === "penalty") initPenalty();
  if (gameId === "hangman") initHangman();
  if (gameId === "memory") initMemory();
  if (gameId === "simulator") initSimulator();
 }

 // --- 1. FTC WORDLE (Daily + Unlimited + Bot) ---
 const ftcWords = [
  "SERVO",
  "MOTOR",
  "AUTON",
  "DRIVE",
  "ROBOT",
  "MATCH",
  "BRICK",
  "POWER",
  "WHEEL",
  "GEARS",
  "ALLOY",
  "FIELD",
  "CRANE",
  "CLAW",
  "PIVOT",
  "SLIDE",
  "GRIPS",
  "JOINT",
  "SHAFT",
  "LEVEL",
  "CYCLE",
  "FRAME",
  "STONE",
  "PIXEL",
  "STACK",
  "PLATE",
  "SCREW",
  "LEVER",
  "ANKER",
  "SPARK",
  "ULTRA",
  "LIGHT",
  "LIDAR",
  "PRESS",
  "BLOCK",
  "MOUNT",
  "CHAIN",
  "GUARD",
  "PANEL",
  "BOARD",
  "ALIGN",
  "ANGLE",
  "ARENA",
  "ARRAY",
  "AUDIO",
  "AXLES",
  "BEAMS",
  "BELTS",
  "BOLTS",
  "BRACE",
  "BRAIN",
  "BRASS",
  "BUILD",
  "BYTES",
  "CABLE",
  "CARGO",
  "CATCH",
  "CHIPS",
  "CLAMP",
  "CLIMB",
  "CLIPS",
  "COACH",
  "CODER",
  "COLOR",
  "CONES",
  "CRASH",
  "CRIMP",
  "DEBUG",
  "DELAY",
  "DIODE",
  "DRILL",
  "DRONE",
  "DUCKS",
  "EPOXY",
  "ERROR",
  "EVENT",
  "FAULT",
  "FLASH",
  "FORCE",
  "FUSES",
  "GATES",
  "GAUGE",
  "GLUES",
  "GLYPH",
  "GRASP",
  "GYROS",
  "HANGS",
  "HOLES",
  "HOOKS",
  "INDEX",
  "INPUT",
  "JEWEL",
  "JOULE",
  "JUDGE",
  "LATCH",
  "LIFTS",
  "LIMIT",
  "LOGIC",
  "LOOPS",
  "MACRO",
  "METAL",
  "MICRO",
  "MODEL",
  "OMNIS",
  "PARTS",
  "PITCH",
  "POLES",
  "PORTS",
  "PRINT",
  "PROBE",
  "RACKS",
  "RADIO",
  "RANGE",
  "RELAY",
  "RELIC",
  "RESET",
  "RINGS",
  "ROVER",
  "RULES",
  "SCORE",
  "SCOUT",
  "SENSE",
  "SETUP",
  "SHOCK",
  "SHOOT",
  "SKILL",
  "SLOTS",
  "SONAR",
  "SPEED",
  "SPIKE",
  "STAGE",
  "START",
  "TEAMS",
  "TIMER",
  "TRACK",
  "TREAD",
  "TRUSS",
  "VOLTS",
  "WATTS",
  "WIRES",
 ];
 let wordleAnswer = "";
 let wordleGuesses = [];
 let wordleCurrentGuess = "";
 let wordleGameOver = false;
 let wordleValidating = false;
 let wordleMode = "daily"; // "daily" or "unlimited"
 let dailyCompleted = false;

 function getDailyWord() {
  // Deterministic daily word: same word for everyone on the same day
  const now = new Date();
  const daysSinceEpoch = Math.floor(now.getTime() / 86400000);
  const index = daysSinceEpoch % ftcWords.length;
  return ftcWords[index];
 }

 function getDailyKey() {
  const now = new Date();
  return `ftc-wordle-daily-${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`;
 }

 
 function updateWordleStats() {
  let hsSpan = document.querySelector('#hs-wordle span:nth-child(1)');
  let winsSpan = document.querySelector('#hs-wordle span:nth-child(2)');
  if(hsSpan) hsSpan.textContent = getStat("wordle-streak", "0");
  if(winsSpan) winsSpan.textContent = getStat("wordle-wins", "0");
 }
 updateWordleStats();
  if (wordleGuesses.length === 1) {
   const first = wordleGuesses[0];
   if (["ROBOT", "DRIVE", "MOTOR", "SERVO"].includes(first)) {
    showRamsayToast("win"); // "Stunning! Classic ingredients!"
   } else if (["AEIOU", "QUEUE", "AUDIO"].includes(first)) {
    showRamsayToast("generic"); // "A bit fruity, but I'll allow it."
   } else {
    showRamsayToast("lose"); // "What is that guess?! It's RAW!"
   }
  }


 function initWordle() {
  // Check if daily was already completed today
  const dailyKey = getDailyKey();
  const savedDaily = localStorage.getItem(dailyKey);

  if (savedDaily && wordleMode === "daily") {
   // Already played today's daily show results and offer unlimited
   const data = JSON.parse(savedDaily);
   wordleAnswer = data.answer;
   wordleGuesses = data.guesses;
   wordleCurrentGuess = "";
   wordleGameOver = true;
   dailyCompleted = true;

   updateModeBadge();
   renderWordleGrid();
  if (wordleCurrentGuess.length === 5) {
    document.querySelectorAll(".wordle-key").forEach(k => {
      if (k.textContent === "ENTER") k.classList.add("can-submit");
    });
  } else {
    document.querySelectorAll(".wordle-key").forEach(k => {
      if (k.textContent === "ENTER") k.classList.remove("can-submit");
    });
  }

   renderWordleKeyboard();
   showMessage(
    data.won
     ? "You already solved today's daily!"
     : `Today's word was ${wordleAnswer}`,
    data.won ? "correct" : "error",
   );
   document.getElementById("wordle-endgame").style.display = "block";
   runBotAnalysis();
   return;
  }

  if (wordleMode === "daily") {
   wordleAnswer = getDailyWord();
  } else {
   wordleAnswer = ftcWords[Math.floor(Math.random() * ftcWords.length)];
  }

  wordleGuesses = [];
  wordleCurrentGuess = "";
  wordleGameOver = false;

  document.getElementById("wordle-message").textContent = "";
  document.getElementById("wordle-endgame").style.display = "none";
  document.getElementById("wordle-bot").style.display = "none";

  updateModeBadge();
  renderWordleGrid();
  if (wordleCurrentGuess.length === 5) {
    document.querySelectorAll(".wordle-key").forEach(k => {
      if (k.textContent === "ENTER") k.classList.add("can-submit");
    });
  } else {
    document.querySelectorAll(".wordle-key").forEach(k => {
      if (k.textContent === "ENTER") k.classList.remove("can-submit");
    });
  }

  renderWordleKeyboard();
 }

 function updateModeBadge() {
  const badge = document.getElementById("wordle-mode-badge");
  if (!badge) return;
  if (wordleMode === "daily") {
   badge.textContent = " Daily Challenge";
   badge.style.background = "rgba(251, 191, 36, 0.15)";
   badge.style.color = "#fbbf24";
   badge.style.border = "1px solid rgba(251, 191, 36, 0.3)";
  } else {
   badge.textContent = " Unlimited Mode";
   badge.style.background = "rgba(59, 130, 246, 0.15)";
   badge.style.color = "#3b82f6";
   badge.style.border = "1px solid rgba(59, 130, 246, 0.3)";
  }
 }

 function renderWordleGrid() {
  const board = document.getElementById("wordle-board");
  board.innerHTML = "";
  for (let i = 0; i < 6; i++) {
   const row = document.createElement("div");
   row.className = "wordle-row";

   let guessString = "";
   if (i < wordleGuesses.length) guessString = wordleGuesses[i];
   else if (i === wordleGuesses.length) guessString = wordleCurrentGuess;

   for (let j = 0; j < 5; j++) {
    const tile = document.createElement("div");
    tile.className = "wordle-tile";
    const letter = guessString[j] || "";
    tile.textContent = letter;

    if (letter) tile.classList.add("filled");

    if (i < wordleGuesses.length) {
     const feedback = getWordleFeedback(guessString, wordleAnswer);
     tile.classList.add(feedback[j]); if(feedback[j] === "correct") spawnSimParticles(tile.getBoundingClientRect().left + 30, tile.getBoundingClientRect().top + 30, "#fbbf24"); tile.style.transitionDelay = `${j * 100}ms`; tile.style.transform = "scale(1.1)"; setTimeout(() => tile.style.transform = "scale(1)", 300 + j*100);
    }

    row.appendChild(tile);
   }
   board.appendChild(row);
  }
 }

 function renderWordleKeyboard() {
  const kb = document.getElementById("wordle-keyboard");
  kb.innerHTML = "";
  const rows = [
   ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
   ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
   ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACK"],
  ];

  const usedLetters = {};
  wordleGuesses.forEach((guess) => {
   const fb = getWordleFeedback(guess, wordleAnswer);
   for (let i = 0; i < 5; i++) {
    const char = guess[i];
    const status = fb[i];

    if (status === "correct") {
     usedLetters[char] = "correct";
    } else if (status === "present") {
     if (usedLetters[char] !== "correct") {
      usedLetters[char] = "present";
     }
    } else if (status === "absent") {
     if (!usedLetters[char]) {
      usedLetters[char] = "absent";
     }
    }
   }
  });

  rows.forEach((r) => {
   const rowDiv = document.createElement("div");
   rowDiv.className = "wordle-key-row";
   r.forEach((key) => {
    const btn = document.createElement("button");
    btn.className = "wordle-key";
    btn.textContent = key === "BACK" ? "" : key;
    if (key === "ENTER" || key === "BACK") btn.classList.add("wide");
    if (usedLetters[key]) btn.classList.add(usedLetters[key]);
    btn.addEventListener("click", () => handleWordleKey(key));
    rowDiv.appendChild(btn);
   });
   kb.appendChild(rowDiv);
  });
 }

 async function checkValidWord(word) {
  const w = word.toLowerCase();
  // 1. Check if it's in our FTC word list first (fast)
  if (ftcWords.includes(w.toUpperCase())) return true;

  // 2. Use a free dictionary API to check if it's a real word
  // We use dictionaryapi.dev as it doesn't require an API key
  try {
   const response = await fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${w}`,
   );
   return response.ok;
  } catch (e) {
   console.warn("Dictionary API unreachable, allowing word.");
   return true; // Fallback to allow if API is down
  }
 }

 async function handleWordleKey(key) {
  if (wordleGameOver || wordleValidating) return;

  if (key === "BACK" || key === "Backspace") {
   wordleCurrentGuess = wordleCurrentGuess.slice(0, -1);
   renderWordleGrid();
  if (wordleCurrentGuess.length === 5) {
    document.querySelectorAll(".wordle-key").forEach(k => {
      if (k.textContent === "ENTER") k.classList.add("can-submit");
    });
  } else {
    document.querySelectorAll(".wordle-key").forEach(k => {
      if (k.textContent === "ENTER") k.classList.remove("can-submit");
    });
  }

  } else if (key === "ENTER" || key === "Enter") {
   if (wordleCurrentGuess.length !== 5) {
    showMessage("Word must be 5 letters");
    shakeCurrentRow();
    return;
   }

   const guess = wordleCurrentGuess;
   wordleValidating = true;

   // Show temporary status
   const msgEl = document.getElementById("wordle-message");
   msgEl.textContent = "Checking word...";
   msgEl.style.color = "var(--text-muted)";

   // Validate against actual dictionary
   const isValid = await checkValidWord(guess);
   msgEl.textContent = "";
   wordleValidating = false;

   if (!isValid) {
    showMessage("Not in word list");
    shakeCurrentRow();
    return;
   }

   const feedback = getWordleFeedback(guess, wordleAnswer);
   wordleGuesses.push(guess);
   wordleCurrentGuess = "";

   // Staggered flip reveal animation
   const rowIndex = wordleGuesses.length - 1;
   const rows = document.querySelectorAll(".wordle-row");
   const row = rows[rowIndex];
   if (row) {
    const tiles = row.querySelectorAll(".wordle-tile");
    tiles.forEach((tile, j) => {
     // Start flip with stagger
     setTimeout(() => {
      tile.classList.add("flip");
      // Apply color at midpoint of flip (when tile is edge-on)
      setTimeout(() => {
       tile.classList.add(feedback[j]); if(feedback[j] === "correct") spawnSimParticles(tile.getBoundingClientRect().left + 30, tile.getBoundingClientRect().top + 30, "#fbbf24"); tile.style.transitionDelay = `${j * 100}ms`; tile.style.transform = "scale(1.1)"; setTimeout(() => tile.style.transform = "scale(1)", 300 + j*100);
      }, 250); // Half of the 500ms flip
     }, j * 100); // Stagger 100ms per tile
    });
   }

   // After all flips complete, handle game state
   const totalFlipTime = 5 * 100 + 500; // stagger + flip duration
   setTimeout(() => {
    if (guess === wordleAnswer) {
     showMessage("Great job!", "correct");
     wordleGameOver = true;
     document.getElementById("wordle-endgame").style.display = "block";
     if (wordleMode === "daily") saveDailyResult(true);
     // Bounce celebration with stagger
     if (row) {
      const tiles = row.querySelectorAll(".wordle-tile");
      tiles.forEach((tile, j) => {
       setTimeout(() => tile.classList.add("bounce"), j * 80);
      });
     }
     runBotAnalysis();
    } else if (wordleGuesses.length === 6) {
     showMessage(`Game over! Word was ${wordleAnswer}`);
     wordleGameOver = true;
     saveStat("wordle-streak", 0);
     updateWordleStats();
  if (wordleGuesses.length === 1) {
   const first = wordleGuesses[0];
   if (["ROBOT", "DRIVE", "MOTOR", "SERVO"].includes(first)) {
    showRamsayToast("win"); // "Stunning! Classic ingredients!"
   } else if (["AEIOU", "QUEUE", "AUDIO"].includes(first)) {
    showRamsayToast("generic"); // "A bit fruity, but I'll allow it."
   } else {
    showRamsayToast("lose"); // "What is that guess?! It's RAW!"
   }
  }

     document.getElementById("wordle-endgame").style.display = "block";
     if (wordleMode === "daily") saveDailyResult(false);
     runBotAnalysis();
    }
    renderWordleKeyboard();
    renderWordleGrid();
  if (wordleCurrentGuess.length === 5) {
    document.querySelectorAll(".wordle-key").forEach(k => {
      if (k.textContent === "ENTER") k.classList.add("can-submit");
    });
  } else {
    document.querySelectorAll(".wordle-key").forEach(k => {
      if (k.textContent === "ENTER") k.classList.remove("can-submit");
    });
  }

   }, totalFlipTime);
  } else if (/^[A-Z]$/.test(key) && wordleCurrentGuess.length < 5) {
   wordleCurrentGuess += key;
   renderWordleGrid();
  if (wordleCurrentGuess.length === 5) {
    document.querySelectorAll(".wordle-key").forEach(k => {
      if (k.textContent === "ENTER") k.classList.add("can-submit");
    });
  } else {
    document.querySelectorAll(".wordle-key").forEach(k => {
      if (k.textContent === "ENTER") k.classList.remove("can-submit");
    });
  }

  }
 }

 function saveDailyResult(won) {
  const dailyKey = getDailyKey();
  localStorage.setItem(
   dailyKey,
   JSON.stringify({
    answer: wordleAnswer,
    guesses: wordleGuesses,
    won: won,
   }),
  );
  dailyCompleted = true;
 }

 // ---- Wordle Bot Analysis ----

 // Get the feedback pattern for a guess against a target word
 function getWordleFeedback(guess, answer) {
  const result = Array(5).fill("absent");
  const answerArr = answer.split("");
  const guessArr = guess.split("");

  // Pass 1: Find all exact matches (greens)
  for (let i = 0; i < 5; i++) {
   if (guessArr[i] === answerArr[i]) {
    result[i] = "correct";
    answerArr[i] = null; // Mark as used
    guessArr[i] = null; // Mark as processed
   }
  }

  // Pass 2: Find remaining matches (yellows)
  for (let i = 0; i < 5; i++) {
   if (guessArr[i] !== null) {
    const index = answerArr.indexOf(guessArr[i]);
    if (index !== -1) {
     result[i] = "present";
     answerArr[index] = null; // Mark as used
    }
   }
  }

  return result;
 }

 // Filter word pool based on a guess and its feedback
 function filterPool(pool, guess, feedback) {
  return pool.filter((word) => {
   const fb = getWordleFeedback(guess, word);
   return fb.every((v, i) => v === feedback[i]);
  });
 }

 // Find the best guess from the word pool (maximizes expected eliminations)
 function findBestGuess(pool) {
  if (pool.length <= 2) return pool[0];
  let bestWord = pool[0];
  let bestScore = -1;
  // For performance, evaluate candidates from the pool itself
  const candidates = pool.length > 30 ? pool.slice(0, 30) : pool;
  for (const candidate of candidates) {
   // Count unique feedback patterns this candidate produces
   const patterns = new Set();
   for (const target of pool) {
    patterns.add(getWordleFeedback(candidate, target).join(","));
   }
   // More unique patterns = more information gained
   const score = patterns.size;
   if (score > bestScore) {
    bestScore = score;
    bestWord = candidate;
   }
  }
  return bestWord;
 }

 function runBotAnalysis() {
  const botDiv = document.getElementById("wordle-bot");
  const botContent = document.getElementById("wordle-bot-content");
  if (!botDiv || !botContent) return;

  botDiv.style.display = "block";
  const won = wordleGuesses.includes(wordleAnswer);
  const numGuesses = wordleGuesses.length;

  let html = "";
  let remainingPool = [...ftcWords]; // start with all words

  // Analyze each guess with cumulative pool narrowing
  wordleGuesses.forEach((guess, idx) => {
   const poolBefore = remainingPool.length;
   const feedback = getWordleFeedback(guess, wordleAnswer);
   const isInWordList = ftcWords.includes(guess);

   // Find what the bot would have suggested
   const botSuggestion = findBestGuess(remainingPool);

   // Narrow the pool
   remainingPool = filterPool(remainingPool, guess, feedback);
   const poolAfter = remainingPool.length;
   const eliminated = poolBefore - poolAfter;
   const pct =
    poolBefore > 0 ? Math.round((eliminated / poolBefore) * 100) : 0;

   // Tile preview
   let tilePreview = "";
   for (let i = 0; i < 5; i++) {
    if (feedback[i] === "correct") tilePreview += "";
    else if (feedback[i] === "present") tilePreview += "";
    else tilePreview += "";
   }

   // Count greens/yellows for grading
   const greens = feedback.filter((f) => f === "correct").length;
   const yellows = feedback.filter((f) => f === "present").length;

   // Grade the guess (honest grading)
   let grade, gradeColor;
   if (guess === wordleAnswer) {
    grade = " Solved!";
    gradeColor = "var(--brand-green)";
   } else if (!isInWordList) {
    grade = " Not in word list";
    gradeColor = "#ef4444";
   } else if (greens >= 3) {
    grade = " Excellent";
    gradeColor = "var(--brand-green)";
   } else if (greens >= 2 || (greens >= 1 && yellows >= 2)) {
    grade = " Great";
    gradeColor = "#fbbf24";
   } else if (pct >= 70) {
    grade = " Strong";
    gradeColor = "#3b82f6";
   } else if (greens >= 1 || yellows >= 2 || pct >= 40) {
    grade = " Decent";
    gradeColor = "#fbbf24";
   } else if (pct >= 20) {
    grade = " Weak";
    gradeColor = "var(--text-muted)";
   } else {
    grade = " Poor";
    gradeColor = "#ef4444";
   }

   // Build suggestion text
   let suggestionHTML = "";
   if (guess !== wordleAnswer && botSuggestion && botSuggestion !== guess) {
    suggestionHTML = `<div style="font-size: 0.75rem; color: #3b82f6; margin-top: 0.3rem;"> Bot would have guessed <strong style="font-family: monospace; letter-spacing: 1px;">${botSuggestion}</strong></div>`;
   }

   // Show remaining candidates (up to 5)
   let candidatesHTML = "";
   if (guess !== wordleAnswer && poolAfter > 0 && poolAfter <= 8) {
    const candidateList = remainingPool
     .map(
      (w) =>
       `<span style="font-family: monospace; background: rgba(13,163,113,0.1); padding: 2px 6px; border-radius: 4px; font-size: 0.7rem;">${w}</span>`,
     )
     .join(" ");
    candidatesHTML = `<div style="font-size: 0.72rem; color: var(--text-muted); margin-top: 0.3rem;">Remaining: ${candidateList}</div>`;
   }

   html += `
      <div style="display: flex; align-items: flex-start; gap: 1rem; margin-bottom: 1rem; padding: 0.75rem; border-radius: 8px; background: rgba(255,255,255,0.02);">
        <div style="min-width: 28px; font-weight: 700; color: var(--text-muted); font-size: 0.85rem;">#${idx + 1}</div>
        <div style="flex: 1;">
          <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.25rem;">
            <span style="font-family: monospace; font-size: 1.1rem; letter-spacing: 2px; font-weight: 700;">${guess}</span>
            <span style="font-size: 0.8rem;">${tilePreview}</span>
          </div>
          <div style="font-size: 0.8rem; color: ${gradeColor}; font-weight: 600;">${grade}</div>
          <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.2rem;">${poolAfter === 0 ? "Solved!" : `${poolAfter} word${poolAfter === 1 ? "" : "s"} remaining (eliminated ${eliminated} of ${poolBefore})`}</div>
          ${suggestionHTML}
          ${candidatesHTML}
        </div>
      </div>`;
  });

  // Overall score
  let overallScore, overallEmoji, overallColor;
  if (won) {
   if (numGuesses === 1) {
    overallScore = "Genius";
    overallEmoji = "";
    overallColor = "#a855f7";
   } else if (numGuesses === 2) {
    overallScore = "Magnificent";
    overallEmoji = "";
    overallColor = "#fbbf24";
   } else if (numGuesses === 3) {
    overallScore = "Impressive";
    overallEmoji = "";
    overallColor = "var(--brand-green)";
   } else if (numGuesses === 4) {
    overallScore = "Solid";
    overallEmoji = "";
    overallColor = "#3b82f6";
   } else if (numGuesses === 5) {
    overallScore = "Close Call";
    overallEmoji = "";
    overallColor = "#fbbf24";
   } else {
    overallScore = "Phew!";
    overallEmoji = "";
    overallColor = "#ef4444";
   }
  } else {
   overallScore = "Better luck next time";
   overallEmoji = "";
   overallColor = "#ef4444";
  }

  html += `
    <div style="margin-top: 1.5rem; padding: 1rem; border-radius: 10px; background: rgba(13,163,113,0.08); text-align: center; border: 1px solid rgba(13,163,113,0.2);">
      <div style="font-size: 2rem; margin-bottom: 0.25rem;">${overallEmoji}</div>
      <div style="font-size: 1.3rem; font-weight: 700; color: ${overallColor};">${overallScore}</div>
      <div style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.25rem;">${won ? `Solved in ${numGuesses}/6 guesses` : `The answer was ${wordleAnswer}`}</div>
    </div>`;

  botContent.innerHTML = html;
 }

 function shakeCurrentRow() {
  const rows = document.querySelectorAll(".wordle-row");
  if (rows[wordleGuesses.length]) {
   rows[wordleGuesses.length].classList.add("shake");
   setTimeout(
    () => rows[wordleGuesses.length].classList.remove("shake"),
    400,
   );
  }
 }

 function shakeLastRow() {
  const rows = document.querySelectorAll(".wordle-row");
  if (rows[wordleGuesses.length - 1]) {
   rows[wordleGuesses.length - 1].classList.add("shake");
   setTimeout(() => {
    if (rows[wordleGuesses.length - 1])
     rows[wordleGuesses.length - 1].classList.remove("shake");
   }, 400);
  }
 }

 function jiggleLastRow() {
  const rows = document.querySelectorAll(".wordle-row");
  if (rows[wordleGuesses.length - 1]) {
   rows[wordleGuesses.length - 1].classList.add("jiggle");
  }
 }

 // Keyboard support
 document.addEventListener("keydown", (e) => {
  if (
   !document.getElementById("game-wordle").classList.contains("hidden") &&
   !wordleGameOver
  ) {
   const key = e.key.toUpperCase();
   if (/^[A-Z]$/.test(key) || key === "ENTER" || key === "BACKSPACE") {
    handleWordleKey(key === "BACKSPACE" ? "BACK" : key);
   }
  }
 });

 function showMessage(msg, type = "error") {
  const el = document.getElementById("wordle-message");
  el.textContent = msg;
  el.style.color = type === "correct" ? "var(--brand-green)" : "#ef4444";
  setTimeout(() => (el.textContent = ""), 3000);
 }

 
 document.getElementById("wordle-share")?.addEventListener("click", () => {
  let grid = "";
  wordleGuesses.forEach(guess => {
   const fb = getWordleFeedback(guess, wordleAnswer);
   fb.forEach(status => {
    if(status === "correct") grid += "";
    else if(status === "present") grid += "";
    else grid += "";
   });
   grid += "\n";
  });
  const text = `FTC Wordle ${wordleGuesses.length}/6\n\n${grid}\nPlay at FTC Alphabots!`;
  navigator.clipboard.writeText(text).then(() => {
   showRamsayToast("win"); // "Masterful! The world is watching!"
   const btn = document.getElementById("wordle-share");
   const oldText = btn.textContent;
   btn.textContent = "Copied! ";
   setTimeout(() => btn.textContent = oldText, 2000);
  });
 });

 document.getElementById("wordle-restart").addEventListener("click", () => {
  wordleMode = "unlimited";
  initWordle();
 });

 // --- 2. FTC TRIVIA ---
 const allTriviaQuestions = [
  // Rules & Basics
  {
   t: "General",
   q: "What does FTC stand for?",
   opts: [
    "First Technology Challenge",
    "FIRST Tech Challenge",
    "For The Coding",
    "FIRST Team Competition",
   ],
   a: 1,
  },
  {
   t: "General",
   q: "How long is the autonomous period?",
   opts: ["15 seconds", "30 seconds", "45 seconds", "60 seconds"],
   a: 1,
  },
  {
   t: "General",
   q: "How long is the teleop period?",
   opts: ["1 minute", "2 minutes", "2.5 minutes", "3 minutes"],
   a: 1,
  },
  {
   t: "General",
   q: "When does the End Game start?",
   opts: [
    "Last 15 seconds",
    "Last 30 seconds",
    "Last 45 seconds",
    "Last minute",
   ],
   a: 1,
  },
  {
   t: "General",
   q: "What is the maximum size of a robot at the start of a match?",
   opts: [
    "16x16x16 inches",
    "18x18x18 inches",
    "20x20x20 inches",
    "24x24x24 inches",
   ],
   a: 1,
  },
  {
   t: "General",
   q: "What is the maximum weight for an FTC robot?",
   opts: ["40 lbs", "42 lbs", "120 lbs", "There is no weight limit"],
   a: 1,
  },
  {
   t: "General",
   q: "How many alliances are there in a standard FTC match?",
   opts: ["1", "2", "3", "4"],
   a: 1,
  },
  {
   t: "General",
   q: "How many teams make up a single alliance in a match?",
   opts: ["1", "2", "3", "4"],
   a: 1,
  },
  {
   t: "Hardware",
   q: "What is the maximum allowed battery voltage nominally?",
   opts: ["9V", "12V", "14V", "18V"],
   a: 1,
  },
  {
   t: "General",
   q: "Which core philosophy coined by Woodie Flowers emphasizes high-quality work and respect?",
   opts: [
    "Coopertition",
    "Gracious Professionalism",
    "STEM Spirit",
    "FIRST Principles",
   ],
   a: 1,
  },
  {
   t: "General",
   q: "What is 'Coopertition'?",
   opts: [
    "Cooperating with your own alliance",
    "Displaying fierce but friendly competition",
    "Competing always, but assisting and enabling others",
    "Winning at all costs",
   ],
   a: 2,
  },
  {
   t: "General",
   q: "If your robot breaks a rule and receives a Major Penalty, how many points go to the opposing alliance?",
   opts: ["10 points", "15 points", "30 points", "45 points"],
   a: 2,
  },
  {
   t: "General",
   q: "If your robot breaks a rule and receives a Minor Penalty, how many points go to the opposing alliance?",
   opts: ["5 points", "10 points", "15 points", "30 points"],
   a: 1,
  },
  // Hardware & Components
  {
   t: "Hardware",
   q: "Which control system connects the phones/control hub to motors?",
   opts: ["REV Expansion Hub", "Arduino Uno", "Raspberry Pi", "VEX Cortex"],
   a: 0,
  },
  {
   t: "Hardware",
   q: "What is the primary brain of the robot called if using the modern system?",
   opts: ["Driver Hub", "RC Phone", "Control Hub", "Expansion Hub"],
   a: 2,
  },
  {
   t: "Hardware",
   q: "What type of wheel allows a robot to translate in any direction (drive sideways)?",
   opts: ["Traction Wheel", "Omni Wheel", "Mecanum Wheel", "Colson Wheel"],
   a: 2,
  },
  {
   t: "Hardware",
   q: "What is a 'dead wheel' used for in odometry?",
   opts: [
    "Providing extra traction",
    "Free-spinning to accurately measure distance without slip",
    "Balancing the robot's weight",
    "A backup wheel in case one breaks",
   ],
   a: 1,
  },
  {
   t: "Hardware",
   q: "What does an encoder do?",
   opts: [
    "Powers the motor",
    "Provides the motor with cooling",
    "Measures the rotation of an axle/motor",
    "Translates code to the hub",
   ],
   a: 2,
  },
  {
   t: "Hardware",
   q: "What is the typical maximum stall current of an FTC battery?",
   opts: ["10 Amps", "20 Amps", "40 Amps", "Over 100 Amps"],
   a: 1,
  },
  {
   t: "Hardware",
   q: "Which type of motor is used for continuous, high-torque rotation?",
   opts: ["Servo Motor", "DC Motor", "Stepper Motor", "Micro Servo"],
   a: 1,
  },
  {
   t: "Hardware",
   q: "Which type of motor is typically used for precise angular positioning (e.g. 180 degrees)?",
   opts: ["DC Motor", "Servo Motor", "Brushless Motor", "Coreless Motor"],
   a: 1,
  },
  {
   t: "Software",
   q: "What does the Driver Hub directly connect to?",
   opts: [
    "The motors",
    "The Expansion Hub",
    "The Control Hub via Wi-Fi",
    "The gamepads directly",
   ],
   a: 2,
  },
  {
   t: "Hardware",
   q: "What does an IMU measure?",
   opts: [
    "Voltage",
    "Distance to objects",
    "Acceleration and Rotation",
    "Light intensity",
   ],
   a: 2,
  },
  // Software & Control
  {
   t: "Software",
   q: "What programming languages are officially supported by FIRST for FTC?",
   opts: ["Java & Blocks", "Python & C++", "Blocks & Python", "C++ & Java"],
   a: 0,
  },
  {
   t: "Software",
   q: "What does PID stand for in control theory?",
   opts: [
    "Proportional, Integral, Derivative",
    "Position, Inertia, Distance",
    "Power, Instinct, Drive",
    "Pulse, Input, Data",
   ],
   a: 0,
  },
  {
   t: "Software",
   q: "What does Telemetry do?",
   opts: [
    "Drives the robot",
    "Sends data from the robot back to the Driver Station",
    "Moves servos",
    "Connects controllers",
   ],
   a: 1,
  },
  {
   t: "Software",
   q: "Which vision system uses QR-code-like markers for localization on the field?",
   opts: ["Vuforia", "TensorFlow", "AprilTags", "OpenCV"],
   a: 2,
  },
  {
   t: "Software",
   q: "What is 'Android Studio'?",
   opts: [
    "A game engine",
    "The visual blocks editor",
    "The officially recommended IDE for Java programming",
    "A CAD software",
   ],
   a: 2,
  },
  {
   t: "Software",
   q: "What class is the base class for all standard TeleOp programs?",
   opts: ["OpMode", "LinearOpMode", "RobotController", "HardwareMap"],
   a: 0,
  },
  {
   t: "Software",
   q: "What class is usually preferred for Autonomous programs because it allows waiting/sleeping?",
   opts: ["OpMode", "LinearOpMode", "ActionLoop", "AutoMode"],
   a: 1,
  },
  {
   t: "Software",
   q: "What object is used to link software variables to physical hardware parts?",
   opts: ["robotMap", "hardwareMap", "deviceMap", "configMap"],
   a: 1,
  },
  {
   t: "Hardware",
   q: "What is the typical tick-per-revolution count for a REV Through Bore Encoder?",
   opts: ["8192", "4096", "1440", "360"],
   a: 0,
  },
  // Game History & General
  {
   t: "General",
   q: "What was the name of the 2023-2024 FTC game?",
   opts: ["PowerPlay", "FreightFrenzy", "CenterStage", "UltimateGoal"],
   a: 2,
  },
  {
   t: "General",
   q: "What was the name of the 2022-2023 FTC game?",
   opts: ["PowerPlay", "FreightFrenzy", "RoverRuckus", "Skystone"],
   a: 0,
  },
  {
   t: "General",
   q: "What was the name of the 2021-2022 FTC game?",
   opts: [
    "UltimateGoal",
    "FreightFrenzy",
    "RelicRecovery",
    "VelocityVortex",
   ],
   a: 1,
  },
  {
   t: "General",
   q: "What was the name of the 2024-2025 FTC game?",
   opts: ["CenterStage", "IntoTheDeep", "Crescendo", "Overdrive"],
   a: 1,
  },
  {
   t: "General",
   q: "What is a 'Bypass'?",
   opts: [
    "When a team chooses not to play a match",
    "A type of electrical short",
    "A maneuver to get around a defender",
    "A software exception",
   ],
   a: 0,
  },
  {
   t: "General",
   q: "What is an 'Inspection decal'?",
   opts: [
    "A sticker indicating the robot passed hardware/software checks",
    "A logo sticker for a sponsor",
    "A barcode for scanning the robot",
    "A colored tag for your alliance",
   ],
   a: 0,
  },
  {
   t: "Outreach",
   q: "What do teams submit to document their engineering journey for awards?",
   opts: [
    "Engineering Portfolio",
    "Engineering Notebook",
    "Both Notebook and Portfolio",
    "A Video Presentation",
   ],
   a: 0,
  },
  {
   t: "Outreach",
   q: "Which award is considered the highest, most prestigious award at an FTC event?",
   opts: ["Innovate Award", "Inspire Award", "Think Award", "Connect Award"],
   a: 1,
  },
  {
   t: "Outreach",
   q: "Which award is given for outstanding outreach and connecting with the STEM community?",
   opts: ["Motivate Award", "Think Award", "Connect Award", "Control Award"],
   a: 2,
  },
  {
   t: "Outreach",
   q: "Which award celebrates the engineering design process and documentation?",
   opts: ["Think Award", "Design Award", "Innovate Award", "Control Award"],
   a: 0,
  },
  {
   t: "General",
   q: "What color are the two alliances in FTC?",
   opts: [
    "Red and Blue",
    "Green and Blue",
    "Red and Yellow",
    "Black and White",
   ],
   a: 0,
  },
  {
   t: "General",
   q: "Where does the drive team stand during a match?",
   opts: [
    "In the center of the field",
    "In the Alliance Station",
    "In the stands",
    "Next to the robot",
   ],
   a: 1,
  },
  {
   t: "General",
   q: "Who is the 'Drive Coach'?",
   opts: [
    "The person driving",
    "The mentor programming",
    "The third person permitted in the Alliance Station guiding the drivers",
    "The referee",
   ],
   a: 2,
  },
  {
   t: "General",
   q: "Can a robot expand outside the 18-inch sizing limit AFTER the match starts?",
   opts: [
    "No, never",
    "Yes, but not in autonomous",
    "Yes, in most games, after the match begins",
    "Yes, but only vertically",
   ],
   a: 2,
  },
  {
   t: "Hardware",
   q: "What does CAD stand for?",
   opts: [
    "Computer Aided Design",
    "Calculated Autonomous Driving",
    "Control And Drive",
    "Central Algorithm Data",
   ],
   a: 0,
  },
  {
   t: "Hardware",
   q: "Which CAD tool is commonly used by FTC teams because it is cloud-based and collaborative?",
   opts: ["AutoCAD", "Onshape", "SolidWorks", "Blender"],
   a: 1,
  },
  {
   t: "Hardware",
   q: "What material is typically used for 3D printing custom robot parts in FTC?",
   opts: ["PLA or PETG", "Steel", "Aluminum 6061", "Carbon Fiber"],
   a: 0,
  },
  {
   t: "Hardware",
   q: "What tool is commonly used to cut flat aluminum or polycarbonate plates?",
   opts: ["Screwdriver", "CNC Router", "Soldering Iron", "3D Printer"],
   a: 1,
  },
  {
   t: "Hardware",
   q: "What size are typical hex shafts used in modern FTC building systems?",
   opts: ["5mm Hex", "3/8 inch square", "8mm D-shaft", "1/4 inch round"],
   a: 0,
  },
 ];
 let triviaQuestions = [];
 let triviaCurrentIdx = 0;
 let triviaScore = 0;
 let triviaLifelineUsed = false;
 
 if (document.getElementById("trivia-ai-lifeline")) {
  document.getElementById("trivia-ai-lifeline").style.opacity = "1";
 }
 document.getElementById("trivia-ai-lifeline")?.addEventListener("click", () => {
  if(triviaLifelineUsed) return;
  triviaLifelineUsed = true;
  document.getElementById("trivia-ai-lifeline").style.opacity = "0.3";
  
  const qData = triviaQuestions[triviaCurrentIdx];
  const correctIdx = qData.a;
  const opts = document.querySelectorAll(".trivia-btn");
  
  // AI Magic (80% accuracy)
  const suggestedIdx = Math.random() > 0.2 ? correctIdx : Math.floor(Math.random()*opts.length);
  
  opts[suggestedIdx].style.boxShadow = "0 0 20px #3b82f6";
  opts[suggestedIdx].innerHTML += " <i class='ph ph-check-circle' style='color: #3b82f6'></i> (AI Suggestion)";
  
  showRamsayToast("win"); // "Listen to the bot!"
  playTone(1200, 0.5, "sine");
 });

 let currentTriviaTopic = "All";

 function resetTriviaTopics() {
  document.getElementById("trivia-topic-screen").classList.remove("hidden");
  document.getElementById("trivia-progress").classList.add("hidden");
  document.getElementById("trivia-question-area").classList.add("hidden");
  document.getElementById("trivia-result").classList.add("hidden");
 }

 document.querySelectorAll(".trivia-topic-btn").forEach((btn) => {
  const topic = btn.getAttribute("data-topic");
  if (topic) {
   let icon = "ph-brain";
   if (topic === "Hardware") icon = "ph-wrench";
   if (topic === "Software") icon = "ph-code";
   if (topic === "Outreach") icon = "ph-users";
   btn.innerHTML = `<i class="ph ${icon}"></i> <span>${topic}</span>`;
  }
  btn.addEventListener("click", (e) => {
   currentTriviaTopic = e.currentTarget.getAttribute("data-topic"); showRamsayToast("generic");
   initTrivia();
  });
 });

 
 function updateTriviaTimerUI() {
  const bar = document.getElementById("trivia-bar");
  if (!bar) return;
  const perc = (triviaTimeLeft / 7) * 100;
  bar.style.width = perc + "%";
  if (triviaTimeLeft < 3) {
    bar.style.background = "#ef4444";
    triggerShake(bar);
  } else {
    bar.style.background = "var(--brand-green)";
  }
 }

 function initTrivia() {
  document.getElementById("trivia-topic-screen").classList.add("hidden");

  let pool = allTriviaQuestions;
  if (currentTriviaTopic !== "All") {
   pool = allTriviaQuestions.filter((q) => q.t === currentTriviaTopic);
  }

  // Ensure we don't request more than exists
  let maxQs = Math.min(8, pool.length);

  // Shuffle and pick maxQs
  let shuffled = [...pool].sort(() => 0.5 - Math.random());
  triviaQuestions = shuffled.slice(0, maxQs);

  triviaCurrentIdx = 0;
  triviaScore = 0;
  triviaLifelineUsed = false;
  
  if (document.getElementById("trivia-ai-lifeline")) {
   document.getElementById("trivia-ai-lifeline").style.opacity = "1";
  }


  document.getElementById("trivia-question-area").classList.remove("hidden");
  document.getElementById("trivia-progress").classList.remove("hidden");
  document.getElementById("trivia-result").classList.add("hidden");

  loadTriviaQuestion();
  clearInterval(triviaTimer);
  triviaTimeLeft = 7;
  updateTriviaTimerUI();
  triviaTimer = setInterval(() => {
   triviaTimeLeft -= 0.1;
   updateTriviaTimerUI();
   if (triviaTimeLeft <= 0) {
    clearInterval(triviaTimer);
    handleTriviaAnswer(-1, null); // Auto-fail
    showRamsayToast("lose"); // "TOO SLOW! GET OUT!"
   }
  }, 100);

 }

 function loadTriviaQuestion() {
  const qData = triviaQuestions[triviaCurrentIdx];

  // Update bar
  const prog = (triviaCurrentIdx / triviaQuestions.length) * 100;
  document.getElementById("trivia-bar").style.width = prog + "%";

  document.getElementById("trivia-q-num").textContent =
   `Question ${triviaCurrentIdx + 1} of ${triviaQuestions.length}`;
  document.getElementById("trivia-question").textContent = qData.q;

  const optsContainer = document.getElementById("trivia-options");
  optsContainer.innerHTML = "";

  qData.opts.forEach((opt, idx) => {
   const btn = document.createElement("button");
   btn.className = "trivia-btn";
   btn.textContent = opt;
   btn.addEventListener("mouseenter", () => playTone(1200, 0.02, "sine")); btn.addEventListener("click", () => handleTriviaAnswer(idx, btn));
   optsContainer.appendChild(btn);
  });
 }

 function updateTriviaStats() {
  let hsSpan = document.querySelector('#hs-trivia span');
  if(hsSpan) hsSpan.textContent = getStat("trivia-hs", "0");
}
updateTriviaStats();

function handleTriviaAnswer(idx, btnNode) {
  clearInterval(triviaTimer);
  // Disable all buttons
  const opts = document.querySelectorAll(".trivia-btn");
  opts.forEach((b) => (b.style.pointerEvents = "none"));

  const correctIdx = triviaQuestions[triviaCurrentIdx].a;
  if (idx === correctIdx) {
   btnNode.classList.add("correct");
   triviaScore++;
  // Speed Bonus
  if (triviaTimeLeft > 5) {
    showRamsayToast("win"); // "STUNNING SPEED!"
  }

  } else {
   btnNode.classList.add("wrong");
   opts[correctIdx].classList.add("correct");
  }

  setTimeout(() => {
   triviaCurrentIdx++;
   if (triviaCurrentIdx < triviaQuestions.length) {
    loadTriviaQuestion();
  clearInterval(triviaTimer);
  triviaTimeLeft = 7;
  updateTriviaTimerUI();
  triviaTimer = setInterval(() => {
   triviaTimeLeft -= 0.1;
   updateTriviaTimerUI();
   if (triviaTimeLeft <= 0) {
    clearInterval(triviaTimer);
    handleTriviaAnswer(-1, null); // Auto-fail
    showRamsayToast("lose"); // "TOO SLOW! GET OUT!"
   }
  }, 100);

   } else {
    showTriviaResult();
   }
  }, 1200);
 }

 function showTriviaResult() {
  document.getElementById("trivia-question-area").classList.add("hidden");
  document.getElementById("trivia-progress").classList.add("hidden");
  const res = document.getElementById("trivia-result");
  res.classList.remove("hidden");

  document.getElementById("trivia-final-score").textContent =
   `${triviaScore}/${triviaQuestions.length}`;

  const msg = document.getElementById("trivia-result-msg");
  if (triviaScore === triviaQuestions.length)
   msg.textContent = "Perfect Score! You're an expert.";
  else if (triviaScore > triviaQuestions.length / 2)
   msg.textContent = "Great job! You know your stuff.";
  else msg.textContent = "Keep studying the game manual!";
 }

 document
  .getElementById("trivia-restart")
  .addEventListener("click", initTrivia);

 // --- 3. TERM SCRAMBLE ---
 const scrambleWords = [
  { word: "ODOMETRY", hint: "Tracking position with dead wheels" },
  { word: "MECANUM", hint: "Wheels that allow strafing" },
  { word: "ALLIANCE", hint: "Two teams working together" },
  { word: "PIDF", hint: "Control loop for precise motor movement" },
  { word: "TELEMETRY", hint: "Data sent from robot to driver station" },
  { word: "GRACIOUS", hint: "_____ Professionalism" },
 ];
 let scrambleCurrentWord = null;
 let scrambleScore = 0;
 let scrambleCombo = 0;
 let scrambleLastMatchTime = 0;

 let scrambleTime = 45; // 45 seconds total
 let scrambleTimerId = null;

 function updateScrambleStats() {
  let wSpan = document.querySelector('#hs-scramble span:nth-child(2)');
  if(wSpan) wSpan.textContent = getStat("scramble-words", "0");
}
updateScrambleStats();
function initScramble() {
  scrambleScore = 0;
  scrambleTime = 45;
  document.getElementById("scramble-score-val").textContent = scrambleScore;
  document.getElementById("scramble-input").value = "";
  document.getElementById("scramble-input").disabled = false;

  document.getElementById("scramble-over").classList.add("hidden");
  document.getElementById("scramble-submit").classList.remove("hidden");
  document.getElementById("scramble-skip").classList.remove("hidden");
  document.getElementById("scramble-input").style.display = "block";
  document.getElementById("scramble-jumbled").style.display = "block";
  document.getElementById("scramble-hint").style.display = "block";

  clearInterval(scrambleTimerId);
  startScrambleTimer();
  nextScrambleWord();
 }

 function startScrambleTimer() {
  const fill = document.getElementById("scramble-timer-fill");
  fill.classList.remove("danger");

  scrambleTimerId = setInterval(() => {
   scrambleTime--;
   const pct = (scrambleTime / 45) * 100;
   fill.style.width = pct + "%";

   if (scrambleTime <= 10) fill.classList.add("danger");

   if (scrambleTime <= 0) {
    clearInterval(scrambleTimerId);
    endScramble();
   }
  }, 1000);
 }

 function nextScrambleWord() {
  scrambleCurrentWord =
   scrambleWords[Math.floor(Math.random() * scrambleWords.length)];

  // Shuffle letters
  let arr = scrambleCurrentWord.word.split("");
  for (let i = arr.length - 1; i > 0; i--) {
   const j = Math.floor(Math.random() * (i + 1));
   [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  document.getElementById("scramble-jumbled").textContent = arr.join("");
  document.getElementById("scramble-hint").textContent =
   `Hint: ${scrambleCurrentWord.hint}`;
  document.getElementById("scramble-input").value = "";
  document.getElementById("scramble-input").focus();
  document.getElementById("scramble-feedback").textContent = "";
 }

 function checkScrambleMatch() {
  const input = document.getElementById("scramble-input").value.toUpperCase();
  if (input === scrambleCurrentWord.word) {
   
   // COMBO SYSTEM
   const now = Date.now();
   if (now - scrambleLastMatchTime < 5000) {
    scrambleCombo++;
    if (scrambleCombo >= 3) {
      triggerConfetti();
      showRamsayToast("win"); // "Masterful! Keep the fire burning!"
    }
   } else {
    scrambleCombo = 1;
   }
   scrambleLastMatchTime = now;
   scrambleScore += (10 * scrambleCombo); scrambleInput.style.borderColor = "#0da371"; setTimeout(() => scrambleInput.style.borderColor = "", 300);

   document.getElementById("scramble-score-val").textContent = scrambleScore;

   const fb = document.getElementById("scramble-feedback");
   fb.textContent = "Correct!";
   fb.className = "scramble-feedback correct";

   setTimeout(nextScrambleWord, 500);
  } else {
   const fb = document.getElementById("scramble-feedback");
   fb.textContent = "Try again!";
   fb.className = "scramble-feedback wrong";
   document.getElementById("scramble-input").classList.add("shake");
   setTimeout(
    () =>
     document.getElementById("scramble-input").classList.remove("shake"),
    400,
   );
  }
 }

 document
  .getElementById("scramble-submit")
  .addEventListener("click", checkScrambleMatch);
 document
  .getElementById("scramble-input")
  .addEventListener("keypress", (e) => {
   if (e.key === "Enter") checkScrambleMatch();
  });
 document
  .getElementById("scramble-skip")
  .addEventListener("click", nextScrambleWord);

 function endScramble() {
  document.getElementById("scramble-input").style.display = "none";
  document.getElementById("scramble-jumbled").style.display = "none";
  document.getElementById("scramble-hint").style.display = "none";
  document.getElementById("scramble-submit").classList.add("hidden");
  document.getElementById("scramble-skip").classList.add("hidden");

  // Output the missed word
  if (scrambleCurrentWord) {
   const fb = document.getElementById("scramble-feedback");
   fb.textContent = `Time's up! The word was: ${scrambleCurrentWord.word}`;
   fb.className = "scramble-feedback wrong";
  }

  document.getElementById("scramble-over").classList.remove("hidden");
  document.getElementById("scramble-final").textContent = scrambleScore;
  let oldWords = parseInt(getStat("scramble-words", "0"));
  if(scrambleScore > oldWords) saveStat("scramble-words", scrambleScore);
  updateScrambleStats();
 }

 document
  .getElementById("scramble-restart")
  .addEventListener("click", initScramble);

 // --- 4. FLASHCARDS ---
 const flashcardDecks = [
  {
   q: "What is Gracious Professionalism?",
   a: "A way of doing things that encourages high-quality work, emphasizes the value of others, and respects individuals and the community.",
  },
  {
   q: "What is the maximum allowed battery voltage?",
   a: "12V (nominally). Usually measures around 13-14V when fully charged.",
  },
  {
   q: "What is the typical size constraint for an FTC robot at the match start?",
   a: "Must fit within an 18 x 18 x 18 inch sizing box.",
  },
  {
   q: "What is 'Dead Wheel' Odometry?",
   a: "Unpowered omni wheels connected to encoders that drag on the ground to track exact robot movement and position.",
  },
  {
   q: "Explain the Autonomous Period",
   a: "The first 30 seconds of a match where the robot operates purely based on pre-programmed instructions and sensors, without driver input.",
  },
 ];
 let fcCurrentIdx = 0;

 function updateFlashcardsStats() {
  let span = document.querySelector('#hs-flashcards span');
  if(span) span.textContent = getStat("flashcards-reviewed", "0");
}
updateFlashcardsStats();
function initFlashcards() {
  fcCurrentIdx = 0;
  document.getElementById("flashcard").classList.remove("flipped");
  loadFlashcard();
 }

 function loadFlashcard() {
  document.getElementById("flashcard-counter").textContent =
   `Card ${fcCurrentIdx + 1} of ${flashcardDecks.length}`;
  document.getElementById("flashcard-front").textContent =
   flashcardDecks[fcCurrentIdx].q;
  document.getElementById("flashcard-back").textContent =
   flashcardDecks[fcCurrentIdx].a;
  document.getElementById("flashcard").classList.remove("flipped");
 }

 document.getElementById("flashcard").addEventListener("click", () => {
  document.getElementById("flashcard").classList.toggle("flipped");
 });

 document.getElementById("fc-next").addEventListener("click", () => {
  fcCurrentIdx = (fcCurrentIdx + 1) % flashcardDecks.length;
  loadFlashcard();
 });

 document.getElementById("fc-prev").addEventListener("click", () => {
  fcCurrentIdx =
   (fcCurrentIdx - 1 + flashcardDecks.length) % flashcardDecks.length;
  loadFlashcard();
 });

 document.getElementById("fc-shuffle").addEventListener("click", () => {
  flashcardDecks.sort(() => Math.random() - 0.5);
  fcCurrentIdx = 0;
  loadFlashcard();
 });

 // --- 5. SPEED MATCH ---
 const matchPairs = [
  {
   term: "Expansion Hub",
   def: "Connects motors, servos, and sensors to the control network",
  },
  {
   term: "Control Hub",
   def: "The main robot brain that runs the Android OS and connects to Driver Station",
  },
  {
   term: "Mecanum Wheel",
   def: "A wheel with angled rollers that allows driving forward, backward, and side-to-side",
  },
  {
   term: "Servo Motor",
   def: "A small motor built to provide precise angular positioning, not full continuous rotation",
  },
  {
   term: "Driver Station",
   def: "The Android device (phone/tablet) used by human operators to control the robot",
  },
  {
   term: "AprilTag",
   def: "A visual fiducial system (similar to QR codes) used for robot camera localization",
  },
  {
   term: "Odometry",
   def: "Using sensors (like dead wheels) to track the robot's exact X, Y, and heading position",
  },
  {
   term: "PID Controller",
   def: "A control loop feedback mechanism commonly used to accurately reach a target position or velocity",
  },
  {
   term: "Autonomous",
   def: "The 30-second phase where the robot operates purely based on pre-programmed instructions",
  },
  {
   term: "TeleOp",
   def: "The 2-minute portion of the match driven by human operators using gamepads",
  },
  {
   term: "Endgame",
   def: "The final 30 seconds of the match where specific high-scoring tasks can usually be performed",
  },
  {
   term: "Gracious Professionalism",
   def: "The core ethos of FIRST, emphasizing high-quality work, respect, and helping others",
  },
  {
   term: "Inspection",
   def: "The process before a tournament where robots are vetted for safety and rule compliance",
  },
  {
   term: "Sizing Box",
   def: "An 18x18x18 inch cube that the robot must fit into at the start of a match",
  },
  {
   term: "Encoder",
   def: "A device attached to a motor or wheel that measures rotational distance or velocity",
  },
  {
   term: "Omni Wheel",
   def: "A wheel with small rollers around the circumference allowing it to roll forward and slide sideways",
  },
  {
   term: "Linear Slide",
   def: "A purely mechanical system utilizing tracks and bearings to extend a manipulator outward or upward",
  },
  {
   term: "GoBilda",
   def: "A popular metric, grid-based hardware building system used heavily in FTC",
  },
  {
   term: "REV Robotics",
   def: "The manufacturer of the Control Hub, Expansion Hub, and many FTC components",
  },
  {
   term: "Color Sensor",
   def: "An I2C sensor used to detect the color and proximity of game elements",
  },
 ];
 let smTimer = 30;
 let smScore = 0;
 let smTimerId = null;
 let currentMatchTerm = null;

 function updateSpeedMatchStats() {
  let span = document.querySelector('#hs-speedmatch span');
  let best = getStat("speedmatch-best", "--");
  if(span) span.textContent = best === "999" ? "--" : best + "s";
}
updateSpeedMatchStats();
function initSpeedMatch() {
  smTimer = 30;
  smScore = 0;
  document.getElementById("sm-timer").textContent = smTimer;
  document.getElementById("sm-score").textContent = smScore;

  document.getElementById("sm-gameover").classList.add("hidden");
  document.getElementById("sm-term").style.display = "block";
  document.getElementById("sm-options").style.display = "grid";

  clearInterval(smTimerId);
  smTimerId = setInterval(() => {
   smTimer--;
   document.getElementById("sm-timer").textContent = smTimer;
   if (smTimer <= 0) {
    clearInterval(smTimerId);
    endSpeedMatch();
   }
  }, 1000);

  nextSpeedMatch();
 }

 function nextSpeedMatch() {
  currentMatchTerm =
   matchPairs[Math.floor(Math.random() * matchPairs.length)];
  document.getElementById("sm-term").textContent = currentMatchTerm.term;

  // Pick 3 random definitions + the correct one
  let options = [currentMatchTerm.def];
  let copy = [...matchPairs].filter((m) => m.term !== currentMatchTerm.term);
  copy.sort(() => Math.random() - 0.5);
  options.push(copy[0].def);
  options.push(copy[1].def);
  options.push(copy[2].def);

  // Shuffle options
  options.sort(() => Math.random() - 0.5);

  const container = document.getElementById("sm-options");
  container.innerHTML = "";

  options.forEach((opt) => {
   const btn = document.createElement("div");
   btn.className = "sm-option";
   btn.textContent = opt;
   btn.addEventListener("click", () => handleSpeedMatchClick(opt, btn));
   container.appendChild(btn);
  });

  document.getElementById("sm-feedback").textContent = "";
 }

 function handleSpeedMatchClick(selectedDef, btnNode) {
  if (selectedDef === currentMatchTerm.def) {
   smScore++;
   document.getElementById("sm-score").textContent = smScore;
   btnNode.classList.add("correct");
   document.getElementById("sm-feedback").textContent = "Match!";
   document.getElementById("sm-feedback").style.color = "var(--brand-green)";

   // Disable clicks
   document
    .querySelectorAll(".sm-option")
    .forEach((b) => (b.style.pointerEvents = "none"));

   setTimeout(nextSpeedMatch, 600);
  } else {
   btnNode.classList.add("wrong");
   document.getElementById("sm-feedback").textContent = "-5 seconds!";
   document.getElementById("sm-feedback").style.color = "#ef4444";
   smTimer = Math.max(0, smTimer - 5);
   document.getElementById("sm-timer").textContent = smTimer;
  }
 }

 function endSpeedMatch() {
  document.getElementById("sm-term").style.display = "none";
  document.getElementById("sm-options").style.display = "none";

  if (currentMatchTerm) {
   const fb = document.getElementById("sm-feedback");
   fb.textContent = `Time's up! Missed: ${currentMatchTerm.term} = ${currentMatchTerm.def}`;
   fb.className = "sm-feedback wrong";
  } else {
   document.getElementById("sm-feedback").textContent = "";
  }

  document.getElementById("sm-gameover").classList.remove("hidden");
  document.getElementById("sm-final").textContent = smScore;
 }

 document
  .getElementById("sm-restart")
  .addEventListener("click", initSpeedMatch);

 // --- 6. PENALTY OR LEGAL? ---
 const penaltyScenarios = [
  {
   s: "A robot intentionally tips over an opposing alliance's robot.",
   a: "Penalty",
  },
  {
   s: "A robot accidentally touches an opponent's robot while both are moving.",
   a: "Legal",
  },
  {
   s: "A drive team member steps into the playing field before the referee signals it is safe.",
   a: "Penalty",
  },
  {
   s: "A robot expands to 20 inches wide during the TeleOp period.",
   a: "Legal",
  }, // into the deep allows expansion
  {
   s: "A robot launches a game element out of the field perimeter.", i: "ph-wind",
   a: "Penalty",
  },
  {
   s: "A human player introduces a game element through the designated return chute.", i: "ph-hand-pointing",
   a: "Legal",
  },
  {
   s: "A robot pins an opponent against the field wall for 6 seconds.",
   a: "Penalty",
  },
  {
   s: "A robot's bumper falls off, but the robot continues to operate safely.",
   a: "Legal",
  },
  {
   s: "A drive coach uses a tablet to show strategy to the drivers during the match.",
   a: "Penalty",
  }, // electronics rule usually prohibits this depending on season, let's keep it simple
  {
   s: "During autonomous, the robot scores pre-loaded elements into the designated scoring area.",
   a: "Legal",
  },
 ];
 let penaltyScore = 0;
 let penaltyIdx = 0;
 let shuffledScenarios = [];

 function updatePenaltyStats() {
  let span = document.querySelector('#hs-penalty span');
  if(span) span.textContent = getStat("penalty-best", "0");
}
updatePenaltyStats();
function initPenalty() {
  penaltyScore = 0;
  penaltyIdx = 0;
  shuffledScenarios = [...penaltyScenarios]
   .sort(() => Math.random() - 0.5)
   .slice(0, 5); // Play 5 scenarios

  document.getElementById("penalty-gameover").classList.add("hidden");
  document.getElementById("penalty-options").classList.remove("hidden");
  document.getElementById("penalty-scenario").classList.remove("hidden");
  document.getElementById("penalty-feedback").textContent = "";

  loadPenaltyScenario();
 }

 function loadPenaltyScenario() {
  const scenario = shuffledScenarios[penaltyIdx];
  document.getElementById("penalty-scenario").textContent =
   `Scenario ${penaltyIdx + 1}: ${scenario.s}`;
 }

 function handlePenaltyGuess(guess) {
  const scenario = shuffledScenarios[penaltyIdx];
  const fb = document.getElementById("penalty-feedback");

  if (guess === scenario.a) {
   penaltyScore++;
   fb.textContent = "Correct!";
   fb.style.color = "var(--brand-green)";
  } else {
   fb.textContent = `Incorrect. It was ${scenario.a}.`;
   fb.style.color = "#ef4444";
  }

  document.getElementById("penalty-options").classList.add("hidden");

  setTimeout(() => {
   penaltyIdx++;
   if (penaltyIdx < shuffledScenarios.length) {
    document.getElementById("penalty-options").classList.remove("hidden");
    fb.textContent = "";
    loadPenaltyScenario();
   } else {
    document.getElementById("penalty-scenario").classList.add("hidden");
    document.getElementById("penalty-options").classList.add("hidden");
    fb.textContent = "";
    document.getElementById("penalty-gameover").classList.remove("hidden");
    document.getElementById("penalty-score").textContent =
     `${penaltyScore} out of ${shuffledScenarios.length}`;
   }
  }, 1500);
 }

 document
  .getElementById("btn-penalty")
  .addEventListener("click", () => handlePenaltyGuess("Penalty"));
 document
  .getElementById("btn-legal")
  .addEventListener("click", () => handlePenaltyGuess("Legal"));
 document
  .getElementById("penalty-restart")
  .addEventListener("click", initPenalty);

 // --- 7. FTC HANGMAN ---
 const hangmanPhrases = [
  "GRACIOUS PROFESSIONALISM",
  "AUTONOMOUS",
  "TELEMETRY",
  "REV ROBOTICS",
  "CONTROL HUB",
  "ODOMETRY",
  "PID CONTROLLER",
 ];
 let hmAnswer = "";
 let hmGuessed = [];
 let hmLives = 6;
 let hmGameOver = false;

 function updateHangmanStats() {
  let span = document.querySelector('#hs-hangman span');
  if(span) span.textContent = getStat("hangman-wins", "0");
}
updateHangmanStats();
function initHangman() {
  hmAnswer =
   hangmanPhrases[Math.floor(Math.random() * hangmanPhrases.length)];
  hmGuessed = [];
  hmLives = 6;
  hmGameOver = false;

  
  // Update "Robot Status" bar
  const livesDiv = document.getElementById("hangman-lives");
  if(livesDiv) {
    let bars = "";
    for(let i=0; i<6; i++) {
      let color = i < hmLives ? "#0da371" : "#333";
      if(hmLives <= 2 && i < hmLives) color = "#ef4444";
      bars += `<div style="width: 20px; height: 10px; background: ${color}; border-radius: 2px;"></div>`;
    }
    livesDiv.innerHTML = `<div style="display: flex; gap: 4px; justify-content: center; margin-bottom: 1rem;">${bars}</div>`;
  }
  
  if(hmLives === 2) {
    playTone(330, 0.2, "sawtooth"); // Low Battery warning
    showRamsayToast("generic"); // "BATTERY IS LOW! GET IT TOGETHER!"
  }
  if(hmLives === 1) {
    playTone(440, 0.5, "sawtooth"); // Final Warning
    triggerShake(document.getElementById("game-hangman"));
  }

  document.getElementById("hangman-gameover").classList.add("hidden");

  renderHangmanWord();
  renderHangmanKeyboard();
 }

 function renderHangmanWord() {
  const container = document.getElementById("hangman-word");
  let display = "";
  for (let char of hmAnswer) {
   if (char === " ") {
    display += " \u00A0 "; // spaces
   } else if (hmGuessed.includes(char)) {
    display += char;
   } else {
    display += "_";
   }
  }
  container.textContent = display;
 }

 function renderHangmanKeyboard() {
  const kb = document.getElementById("hangman-keyboard");
  kb.innerHTML = "";
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  letters.forEach((char) => {
   const btn = document.createElement("button");
   btn.className = "btn btn-outline";
   btn.style.padding = "0.5rem";
   btn.style.width = "40px";
   btn.textContent = char;

   if (hmGuessed.includes(char)) {
    btn.disabled = true;
    if (hmAnswer.includes(char)) {
     btn.classList.add("bg-green"); // could style nicely
     btn.style.borderColor = "var(--brand-green)";
     btn.style.color = "var(--brand-green)";
    } else {
     btn.style.opacity = "0.3";
    }
   } else {
    btn.addEventListener("click", () => handleHangmanGuess(char));
   }
   kb.appendChild(btn);
  });
 }

 function handleHangmanGuess(char) {
  if (hmGameOver || hmGuessed.includes(char)) return;

  hmGuessed.push(char);

  if (!hmAnswer.includes(char)) {
   hmLives--;
   
  // Update "Robot Status" bar
  const livesDiv = document.getElementById("hangman-lives");
  if(livesDiv) {
    let bars = "";
    for(let i=0; i<6; i++) {
      let color = i < hmLives ? "#0da371" : "#333";
      if(hmLives <= 2 && i < hmLives) color = "#ef4444";
      bars += `<div style="width: 20px; height: 10px; background: ${color}; border-radius: 2px;"></div>`;
    }
    livesDiv.innerHTML = `<div style="display: flex; gap: 4px; justify-content: center; margin-bottom: 1rem;">${bars}</div>`;
  }
  
  if(hmLives === 2) {
    playTone(330, 0.2, "sawtooth"); // Low Battery warning
    showRamsayToast("generic"); // "BATTERY IS LOW! GET IT TOGETHER!"
  }
  if(hmLives === 1) {
    playTone(440, 0.5, "sawtooth"); // Final Warning
    triggerShake(document.getElementById("game-hangman"));
  }

  }

  renderHangmanWord();
  renderHangmanKeyboard();

  checkHangmanWinLoss();
 }

 function checkHangmanWinLoss() {
  let won = true;
  for (let char of hmAnswer) {
   if (char !== " " && !hmGuessed.includes(char)) {
    won = false;
    break;
   }
  }

  const go = document.getElementById("hangman-gameover");
  const msg = document.getElementById("hangman-result-msg");

  if (won) {
   hmGameOver = true;
   go.classList.remove("hidden");
   msg.textContent = "You Win!";
   msg.style.color = "var(--brand-green)";
  } else if (hmLives <= 0) {
   hmGameOver = true;
   go.classList.remove("hidden");
   msg.textContent = `Game Over. The phrase was: ${hmAnswer}`;
   msg.style.color = "#ef4444";

   // Reveal word completely
   const container = document.getElementById("hangman-word");
   container.textContent = hmAnswer;
  }
 }

 document
  .getElementById("hangman-restart")
  .addEventListener("click", initHangman);

 // --- 8. MEMORY MATCH ---
 const memoryIcons = [
  "ph-gear",
  "ph-cpu",
  "ph-battery-charging",
  "ph-game-controller",
  "ph-wrench",
  "ph-car",
  "ph-code",
  "ph-shield-check",
 ];
 let memoryCards = [];
 let memoryFlipped = [];
 let memoryMatched = 0;
 let memoryMoves = 0; let memoryStreak = 0;

 function updateMemoryStats() {
  let tSpan = document.querySelector('#hs-memory span:nth-child(1)');
  let mSpan = document.querySelector('#hs-memory span:nth-child(2)');
  let t = getStat("memory-time", "--");
  let m = getStat("memory-moves", "--");
  if(tSpan) tSpan.textContent = t === "999" ? "--" : t + "s";
  if(mSpan) mSpan.textContent = m === "999" ? "--" : m;
}
updateMemoryStats();

 const memoryIconPool = [
  "ph-cpu", "ph-gear", "ph-robot", "ph-plug-charging", "ph-battery-high", 
  "ph-circuitry", "ph-wrench", "ph-screwdriver", "ph-game-controller", 
  "ph-monitor", "ph-laptop", "ph-hard-drive", "ph-keyboard", "ph-mouse", 
  "ph-printer", "ph-broadcast", "ph-bluetooth", "ph-wifi-high", "ph-cloud", "ph-terminal"
 ];

 function initMemory() {
  memoryMoves = 0;
  memoryMatched = 0;
  memoryFlipped = [];
  document.getElementById("memory-moves").textContent = memoryMoves;
  document.getElementById("memory-gameover").classList.add("hidden");

  let pairs = [...memoryIcons, ...memoryIcons];
  pairs.sort(() => Math.random() - 0.5);
  memoryCards = pairs;

  const board = document.getElementById("memory-board");
  board.innerHTML = "";
  board.style.display = "grid";
  board.style.gridTemplateColumns = "repeat(4, 1fr)";
  board.style.gap = "10px";
  board.style.maxWidth = "400px";
  board.style.margin = "0 auto";

  memoryCards.forEach((iconName, idx) => {
   const card = document.createElement("div");
   card.className =
    "memory-card bg-darker flex-center cursor-pointer rounded";
   card.style.height = "80px";
   card.style.fontSize = "2rem";
   card.dataset.icon = iconName;
   card.dataset.idx = idx;

   // Initially hidden (show a question mark)
   card.innerHTML = `<i class="ph ph-question text-muted"></i>`;

   card.addEventListener("click", () => handleMemoryClick(card));
   board.appendChild(card);
  });
 }

 function handleMemoryClick(cardNode) {
  let idx = cardNode.dataset.idx;
  if (memoryFlipped.length === 2) return; // Wait
  if (
   cardNode.classList.contains("matched") ||
   memoryFlipped.some((f) => f.dataset.idx === idx)
  )
   return;

  // Flip card
  let iconName = cardNode.dataset.icon;
  cardNode.innerHTML = `<i class="ph ${iconName} text-green"></i>`;
  memoryFlipped.push(cardNode);

  if (memoryFlipped.length === 2) {
   memoryMoves++; memoryStreak = 0;
   document.getElementById("memory-moves").textContent = memoryMoves;

   let c1 = memoryFlipped[0];
   let c2 = memoryFlipped[1];

   if (c1.dataset.icon === c2.dataset.icon) {
    c1.classList.add("matched");
    c2.classList.add("matched");
    c1.style.backgroundColor = "rgba(16, 185, 129, 0.2)";
    c2.style.backgroundColor = "rgba(16, 185, 129, 0.2)";
    memoryMatched += 2;
    memoryFlipped = [];

    if (memoryMatched === memoryCards.length) {
     document.getElementById("memory-gameover").classList.remove("hidden");
    }
   } else {
    setTimeout(() => {
     c1.innerHTML = `<i class="ph ph-question text-muted"></i>`;
     c2.innerHTML = `<i class="ph ph-question text-muted"></i>`;
     memoryFlipped = [];
    }, 1000);
   }
  }
 }

 document
  .getElementById("memory-restart")
  .addEventListener("click", initMemory);

 // =========================================
 // LIGHTBOX / PHOTO VIEWER LOGIC
 // =========================================
 const lightbox = document.getElementById("lightbox");
 const lightboxImg = document.getElementById("lightbox-img");
 const lightboxCaption = document.getElementById("lightbox-caption");
 const lightboxCounter = document.getElementById("lightbox-counter");
 const closeBtn = document.querySelector(".lightbox-close");
 const prevBtn = document.querySelector(".lightbox-nav.prev");
 const nextBtn = document.querySelector(".lightbox-nav.next");

 let galleryImages = [];
 let currentImageIndex = 0;
 let galleryBuilt = false;

 async function loadGalleryAndLightbox() {
  if (galleryBuilt) return; // Prevent multiple builds

  const galleryGrid = document.querySelector(".gallery-grid");
  if (!galleryGrid) return;

  try {
   const response = await fetch(
    "gallery/gallery.json?v=" + new Date().getTime(),
   ); // Cache bust
   if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
   }
   const imageUrls = await response.json();

   // Clear existing hardcoded images
   galleryGrid.innerHTML = "";

   // Create and append gallery items
   imageUrls.forEach((itemData, index) => {
    const src = typeof itemData === "string" ? itemData : itemData.src;
    const caption =
     typeof itemData === "string"
      ? `Gallery Image ${index + 1}`
      : itemData.title || itemData.caption;

    const item = document.createElement("div");
    item.className = "premium-card reveal gallery-item p-1";

    const img = document.createElement("img");
    img.src = src;
    img.alt = caption;
    img.className = "gallery-img";
    img.style.cursor = "pointer";

    // Add special class for the wide image for styling
    if ((index + 1) % 5 === 0) {
     // Example: make every 5th image span full width
     item.style.gridColumn = "1 / -1";
    }

    item.appendChild(img);
    galleryGrid.appendChild(item);
   });

   // Now that images are in the DOM, initialize lightbox data
   const imgElements = document.querySelectorAll(".gallery-img");
   galleryImages = Array.from(imgElements).map((img) => ({
    src: img.src,
    alt: img.alt || "Gallery Image",
   }));

   // Add click listeners to newly created gallery items
   imgElements.forEach((img, index) => {
    img.addEventListener("click", () => {
     openLightbox(index);
    });
   });

   galleryBuilt = true; // Mark as built
  } catch (error) {
   console.error("Error loading gallery:", error);
  // Staggered Reveal
  const items = galleryContainer.querySelectorAll('.gallery-item');
  items.forEach((item, index) => {
   setTimeout(() => item.classList.add('reveal-now'), index * 100);
  });

   galleryGrid.innerHTML =
    '<p class="text-center text-red" style="grid-column: 1/-1;">Could not load gallery images.</p>';
  }
 }

 // The main tab switching function needs to be updated to call this
 // The original snippet had:
 // if (targetId === 'gallery') {
 //   initLightbox();
 // }
 // It should be changed to:
 // if (targetId === 'gallery') {
 //   loadGalleryAndLightbox();
 // }

 function openLightbox(index) {
  currentImageIndex = index;

  lightboxImg.classList.remove("lightbox-img-switching");

  updateLightboxContent();

  setTimeout(() => {
   lightbox.classList.add("open");
   document.body.style.overflow = "hidden";
  }, 10);
 }

 function closeLightbox() {
  lightbox.classList.remove("open");
  document.body.style.overflow = "";
 }

 function updateLightboxContent() {
  if (galleryImages.length === 0) return;
  const image = galleryImages[currentImageIndex];
  if (!image) return;

  lightboxImg.classList.add("lightbox-img-switching");

  setTimeout(() => {
   lightboxImg.src = image.src;
   lightboxImg.alt = image.alt;
   lightboxCaption.textContent = image.alt;
   lightboxCounter.textContent = `${currentImageIndex + 1} / ${galleryImages.length}`;

   setTimeout(() => {
    lightboxImg.classList.remove("lightbox-img-switching");
   }, 50);
  }, 200);
 }

 function nextImage() {
  currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
  updateLightboxContent();
 }

 function prevImage() {
  currentImageIndex =
   (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
  updateLightboxContent();
 }

 if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
 if (nextBtn) nextBtn.addEventListener("click", nextImage);
 if (prevBtn) prevBtn.addEventListener("click", prevImage);

 if (lightbox) {
  lightbox.addEventListener("click", (e) => {
   if (
    e.target === lightbox ||
    e.target.classList.contains("lightbox-content")
   ) {
    closeLightbox();
   }
  });
 }

 document.addEventListener("keydown", (e) => {
  if (!lightbox || !lightbox.classList.contains("open")) return;

  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowRight") nextImage();
  if (e.key === "ArrowLeft") prevImage();
 });

 // We no longer call initLightbox globally, it's called on tab switch.

 // ======= Easter Egg: Barrel Roll =======
 const logoContainer = document.querySelector(".logo-container");
 let logoClicks = 0;
 if (logoContainer) {
  logoContainer.addEventListener("click", () => {
   logoClicks++;
   if (logoClicks >= 5) {
    document.body.style.transition = "transform 1s ease-in-out";
    document.body.style.transform = "rotate(360deg)";
    setTimeout(() => {
     document.body.style.transition = "none";
     document.body.style.transform = "";
     logoClicks = 0;
    }, 1000);
   }
  });
 }

 // ======= Magnetic Buttons =======
 const magneticElements = document.querySelectorAll(
  ".btn-primary, .contact-card:not(.static)",
 );
 magneticElements.forEach((elem) => {
  // Exclude elements inside the AI chat widget
  if (elem.closest("#alpha-chat-container")) return;

  elem.addEventListener("mousemove", (e) => {
   const rect = elem.getBoundingClientRect();
   const x = e.clientX - rect.left - rect.width / 2;
   const y = e.clientY - rect.top - rect.height / 2;

   // Subtle pull
   elem.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px) scale(1.02)`;
  });

  elem.addEventListener("mouseleave", () => {
   // Reset to default hover scale
   elem.style.transform = `translate(0px, 0px) scale(1.02)`;
   setTimeout(() => {
    // If not hovered anymore, snap back completely
    if (!elem.matches(":hover")) {
     elem.style.transform = ``;
    }
   }, 100);
  });
 });

 // ======= 3D Card Tilt =======
 const tiltCards = document.querySelectorAll(
  ".premium-card:not(#alpha-chat-container), .game-card",
 );
 tiltCards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
   const rect = card.getBoundingClientRect();
   const x = e.clientX - rect.left; // x position within the element
   const y = e.clientY - rect.top; // y position within the element

   const centerX = rect.width / 2;
   const centerY = rect.height / 2;

   const rotateX = ((y - centerY) / centerY) * -5; // max 5 deg
   const rotateY = ((x - centerX) / centerX) * 5;

   // Apply slight tilt and maintain scaling
   card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02) translateY(-2px)`;
  });

  card.addEventListener("mouseleave", () => {
   card.style.transform = ``;
  });
 });

 // ======= WebLLM Chatbot Integration =======
 const startAlphaBtn = document.getElementById("start-alpha-btn");
 const chatInput = document.getElementById("chat-input");
 const chatSendBtn = document.getElementById("chat-send-btn");
 const chatMessages = document.getElementById("chat-messages");
 const chatStatusText = document.getElementById("chat-status-text");
 const aiVersionSelect = document.getElementById("ai-version-select");

 let engine = null;
 let isGenerating = false;

 const MODELS = {
  v1: "Hermes-2-Pro-Llama-3-8B-q4f16_1-MLC",
  v2: "Qwen2-1.5B-Instruct-q4f16_1-MLC"
 };
 let SELECTED_MODEL = MODELS.v2; // Default to v2

 if (aiVersionSelect) {
  aiVersionSelect.addEventListener("change", (e) => {
   if (MODELS[e.target.value]) {
    SELECTED_MODEL = MODELS[e.target.value];
   }
  });
 }

 // FTC System Prompt
 const systemPrompt = `You are "Alphabots AI", an expert assistant representing FIRST Tech Challenge (FTC) Team 19639, the Alphabots.
To assist with queries, you have access to external tools. To USE a tool, you MUST generate an XML tag exactly like this:
<call:tool_name>{"arg_name": "arg_value"}</call>

Available Tools:
<tools>
[
 {
  "name": "get_ftc_team_stats",
  "description": "Get current season statistics for a specific FIRST Tech Challenge (FTC) team by their team number.",
  "parameters": {
   "type": "object",
   "properties": {
    "team_number": { "type": "integer", "description": "The official FTC team number (e.g., 19639)." }
   },
   "required": ["team_number"]
  }
 },
 {
  "name": "get_alphabots_info",
  "description": "Get general information about the Alphabots team (Mission, Outreach, Roster, Games, rules)."
 },
 {
  "name": "calculate_robot_speed",
  "description": "Calculate theoretical drive speed in ft/sec and m/sec.",
  "parameters": {
   "type": "object",
   "properties": {
    "motor_rpm": { "type": "number", "description": "Motor RPM at output." },
    "wheel_dia": { "type": "number", "description": "Wheel diameter in inches (e.g., 4)." },
    "gear_ratio": { "type": "number", "description": "Gear ratio output/input multiplier (Default 1)." }
   },
   "required": ["motor_rpm", "wheel_dia"]
  }
 },
 {
  "name": "trigger_easter_egg",
  "description": "Trigger a visual Easter Egg effect on the page (e.g., barrel roll).",
  "parameters": {
   "type": "object",
   "properties": {
    "type": { "type": "string", "enum": ["barrel_roll"] }
   }
  }
 }
]
</tools>

If you produce a <call:> tag, do NOT provide answers until you receive the response in a <response></response> tag.
You must ONLY answer questions related to FIRST Robotics (FLL, FTC, FRC), general robotics, and Team 19639.
Be concise and direct. AVOID flowery descriptive summaries or generic AI fluffer (e.g., 'Overall, Varun is...'). Rely ONLY on facts from tools or site data. KEEP ANSWERS SHORT. Do not embellish. CRITICAL: If asked about the Team Roster/Members, Mission, or Outreach, you DO NOT know them. You MUST call <call:get_alphabots_info>{}</call> immediately before answering. DO NOT use placeholders like [Name].`;

 const chatHistory = [{ role: "system", content: systemPrompt }];

 // Tool Definition for FTC Scout
 const tools = [
  {
   type: "function",
   function: {
    name: "get_ftc_team_stats",
    description:
     "Get current season statistics for a specific FIRST Tech Challenge (FTC) team by their team number.",
    parameters: {
     type: "object",
     properties: {
      team_number: {
       type: "integer",
       description: "The official FTC team number (e.g., 19639).",
      },
     },
     required: ["team_number"],
    },
   },
  },
 ];

 // Tool Execution Function
 async function executeFtcScoutTool(teamNumber) {
  try {
   const response = await fetch(
    `https://api.ftcscout.org/rest/v1/teams/${teamNumber}/quick-stats`,
   );
   if (!response.ok) {
    if (response.status === 404)
     return `Error: Team ${teamNumber} not found on FTC Scout.`;
    throw new Error("HTTP error " + response.status);
   }
   const data = await response.json();

   // Format data into a clean string for the LLM
   return `Stats for Team ${teamNumber}:\nTotal OPR: ${data.tot ? data.tot.value.toFixed(2) : "N/A"}\nAuto OPR: ${data.auto ? data.auto.value.toFixed(2) : "N/A"}\nTeleop OPR: ${data.dc ? data.dc.value.toFixed(2) : "N/A"}\nSeason: ${data.season}`;
  } catch (error) {
   console.error("Tool execution failed:", error);
   return (
    `Failed to retrieve stats for team ${teamNumber}: ` + error.message
   );
  }
 }

 // Append Message to UI
 function addMessageToUI(role, content) {
  const bubble = document.createElement("div");
  bubble.classList.add("chat-bubble", role);

  // Simple markdown parsing for bolding in assistant messages
  let formattedContent = content;
  if (role === "assistant") {
   formattedContent = formattedContent.replace(
    /\*\*(.*?)\*\*/g,
    "<strong>$1</strong>",
   );
   formattedContent = formattedContent.replace(/\n/g, "<br>");
  }

  bubble.innerHTML = formattedContent;
  if (content.includes("ascii-message")) {
    bubble.style.background = "transparent";
    bubble.style.padding = "0";
    bubble.style.boxShadow = "none";
  }
  chatMessages.appendChild(bubble);
  chatMessages.scrollTop = chatMessages.scrollHeight;
 }

 let currentThinkingBubble = null;
 function showThinkingBubble() {
  if (currentThinkingBubble) return;
  const bubble = document.createElement("div");
  bubble.classList.add("chat-bubble", "assistant", "thinking");
  bubble.innerHTML = `<span>Thinking</span><div class="thinking-spinner"></div>`;
  chatMessages.appendChild(bubble);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  currentThinkingBubble = bubble;
 }

 function removeThinkingBubble() {
  if (currentThinkingBubble) {
   currentThinkingBubble.remove();
   currentThinkingBubble = null;
  }
 }

 // Start engine automatically
 if (!engine && !window.engineInitializing) {
  initializeWebLLM();
 }

 // Initialize the engine
 async function initializeWebLLM() {
  if (engine || window.engineInitializing) return;
  window.engineInitializing = true;

  chatInput.disabled = true;
  chatSendBtn.disabled = true;
  if (aiVersionSelect) aiVersionSelect.disabled = true;

  addMessageToUI(
   "system",
   "Downloading & loading AI model. This requires a modern browser and may take a few minutes the first time (it caches for later).",
  );

  const initProgressCallback = (report) => {
   chatStatusText.textContent = report.text;
  };

  try {
   engine = await CreateMLCEngine(SELECTED_MODEL, { initProgressCallback });
   chatStatusText.textContent = "Online";
   chatStatusText.style.color = "var(--brand-green)";

   if (startAlphaBtn) {
    startAlphaBtn.textContent = "Engine Running";
    startAlphaBtn.style.display = "none";
   }

   chatInput.disabled = false;
   chatSendBtn.disabled = false;

   addMessageToUI("assistant", ASCII_GREETING_MSG);
   addMessageToUI(
    "assistant",
    "Hello! I'm Alphabots AI. How can I help you with FIRST Robotics (FLL, FTC, FRC) or Team 19639 today?",
   );
  } catch (error) {
   console.error("Failed to initialize WebLLM:", error);
   chatStatusText.textContent = "Initialization Failed";
   chatStatusText.style.color = "#ef4444";
   if (startAlphaBtn) {
    startAlphaBtn.textContent = "Try Again";
    startAlphaBtn.disabled = false;
   }
   addMessageToUI(
    "system",
    "Failed to load the AI model. Your browser or hardware might not be supported.",
   );
  } finally {
   window.engineInitializing = false;
  }
 }

 // Send Message Logic
 async function handleSend() {
  const text = chatInput.value.trim();
  if (!text || isGenerating || !engine) return;

  // UI Updates
  chatInput.value = "";
  chatInput.disabled = true;
  chatSendBtn.disabled = true;
  isGenerating = true;
  chatStatusText.textContent = "Thinking...";

  // Add user msg to UI and History
  addMessageToUI("user", text);
  chatHistory.push({ role: "user", content: text });
  showThinkingBubble();

  try {
   // First LLM Call (might return text, or might call a tool manually)
   let response = await engine.chat.completions.create({
    messages: chatHistory,
    temperature: 0.7,
   });

   if (!response || !response.choices || response.choices.length === 0) {
    throw new Error("No response choices returned from AI model.");
   }
   let msg = response.choices[0].message;
   if (!msg) {
    throw new Error("No message returned from AI model.");
   }
   chatHistory.push(msg);

   // Manual Tool Parsing for <call:> tag
   const callMatch = msg.content ? msg.content.match(/<call:(\w+)>([\s\S]*?)<\/call>/) : null;
   if (callMatch) {
     const funcName = callMatch[1];
     const argsText = callMatch[2].trim();
     
     if (funcName === "get_ftc_team_stats") {
       chatStatusText.textContent = "Fetching Stats...";
       let args = {};
       try {
        args = JSON.parse(argsText);
       } catch (e) {
        console.error("Failed to parse tool arguments:", argsText, e);
        chatHistory.push({ role: "user", content: `<response>Error: Invalid argument JSON: ${e.message}</response>` });
       }
       
       const teamNumber = args.team_number || args.teamNumber || args.team;
       if (teamNumber) {
         const result = await executeFtcScoutTool(teamNumber);
         addMessageToUI("system", `*Used tool: fetched stats for Team ${teamNumber}*`);
         chatHistory.push({ role: "user", content: `<response>${result}</response>` });

         chatStatusText.textContent = "Reading Stats...";
         response = await engine.chat.completions.create({ messages: chatHistory });
         
         if (!response || !response.choices || response.choices.length === 0) {
           throw new Error("No response choices returned during tool follow-up.");
         }
         msg = response.choices[0].message;
         if (!msg) {
           throw new Error("No message returned during tool follow-up.");
         }
         chatHistory.push(msg);
       }
     } else if (funcName === "get_alphabots_info") {
       chatStatusText.textContent = "Scanning Site Data...";
       try {
         const responseJson = await fetch('site_data.json');
         const siteData = await responseJson.json();
         const resultText = JSON.stringify(siteData, null, 2);
         addMessageToUI("system", `*Used tool: fetched full site data scan*`);
         chatHistory.push({ role: "user", content: `<response>${resultText}</response>` });

         chatStatusText.textContent = "Processing Knowledge...";
         response = await engine.chat.completions.create({ messages: chatHistory });
         
         if (!response || !response.choices || response.choices.length === 0) {
           throw new Error("No response choices returned during tool follow-up.");
         }
         msg = response.choices[0].message;
         if (!msg) {
           throw new Error("No message returned during tool follow-up.");
         }
         chatHistory.push(msg);
       } catch (e) {
         console.error("Failed to fetch site data:", e);
         chatHistory.push({ role: "user", content: `<response>Error: Failed to secure site scan data: ${e.message}</response>` });
       }
     } else if (funcName === "calculate_robot_speed") {
       chatStatusText.textContent = "Calculating dynamics...";
       try {
         const args = JSON.parse(argsText);
         const rpm = args.motor_rpm;
         const dia = args.wheel_dia;
         const ratio = args.gear_ratio || 1;
         
         const wheel_rpm = rpm * ratio;
         const speed_in_min = wheel_rpm * Math.PI * dia;
         const speed_ft_sec = speed_in_min / (12 * 60);
         const speed_m_sec = speed_ft_sec * 0.3048;

         const resultText = `Theoretical Speed:\n- ${speed_ft_sec.toFixed(2)} ft/sec\n- ${speed_m_sec.toFixed(2)} m/sec\n\nVariables: Dia=${dia}", RPM=${rpm}, Ratio=${ratio}`;
         addMessageToUI("system", `*Calculated robot physics speed*`);
         chatHistory.push({ role: "user", content: `<response>${resultText}</response>` });

         chatStatusText.textContent = "Reading Calculations...";
         response = await engine.chat.completions.create({ messages: chatHistory });
         chatHistory.push(response.choices[0].message);
       } catch (e) {
         chatHistory.push({ role: "user", content: `<response>Error: ${e.message}</response>` });
       }
     } else if (funcName === "trigger_easter_egg") {
       try {
         const args = JSON.parse(argsText);
         if (args.type === "barrel_roll") {
           document.body.style.transition = "transform 1s ease-in-out";
           document.body.style.transform = "rotate(360deg)";
           setTimeout(() => { document.body.style.transition = "none"; document.body.style.transform = "none"; }, 1000);
           addMessageToUI("system", `*Visual Easter Egg: Barrel Roll Triggered!*`);
           chatHistory.push({ role: "user", content: `<response>Successfully triggered barrel_roll easter egg visual effect.</response>` });
         } else {
           chatHistory.push({ role: "user", content: `<response>Unknown easter egg requested.</response>` });
         }
         chatStatusText.textContent = "Processing Effect...";
         response = await engine.chat.completions.create({ messages: chatHistory });
         chatHistory.push(response.choices[0].message);
       } catch (e) {
         chatHistory.push({ role: "user", content: `<response>Error: ${e.message}</response>` });
       }
     }
   }

   // Finally, print the assistant's answer
   removeThinkingBubble();
   if (msg.content) {
    addMessageToUI("assistant", msg.content);
   }

   // Prune tools artifacts to avoid multi-turn validation errors on subsequent requests
   for (let i = chatHistory.length - 1; i >= 0; i--) {
    const m = chatHistory[i];
    if (m.role === "tool" || (m.role === "assistant" && m.tool_calls && m.tool_calls.length > 0)) {
     chatHistory.splice(i, 1);
    }
   }
  } catch (error) {
   removeThinkingBubble();
   console.error("Chat generation error:", error);
   addMessageToUI("system", "An error occurred during generation: " + (error.message || error));
  } finally {
   isGenerating = false;
   chatInput.disabled = false;
   chatSendBtn.disabled = false;
   chatStatusText.textContent = "Online";
   chatInput.focus();
  }
 }

 chatSendBtn.addEventListener("click", handleSend);
 chatInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") handleSend();
 });

 
 // --- 9. FTC SIMULATOR ---
 let simBalls = [];
 let simSkids = [];
 let simParticles = [];
 let simBarriers = [
  {x: 200, y: 200, w: 200, h: 20},
  {x: 200, y: 380, w: 200, h: 20},
  {x: 200, y: 220, w: 20, h: 160},
  {x: 380, y: 220, w: 20, h: 160}
 ];
 let simGoals = [ 
  {x: 300, y: 50, radius: 40, pts: 10, name: "High Basket", color: "#fbbf24"},
  {x: 50, y: 550, radius: 60, pts: 2, name: "Low Basket", color: "#3b82f6"},
  {x: 550, y: 550, radius: 60, pts: 2, name: "Low Basket", color: "#3b82f6"}
 ];
 let simCanvas, simCtx, simLoop, simTimerInterval;
 let simTime = 120, simScore = 0, simIntake = 0, simActive = false, simLastTime = 0, simShake = 0;
 let simRobot = { x: 300, y: 300, size: 20, speed: 200, dx: 0, dy: 0, angle: 0, vx: 0, vy: 0, acc: 1000, friction: 0.92, battery: 100, isCharging: false, isStunned: false };
 const keys = {};

 function spawnSimParticles(x, y, color = "#fbbf24") {
  for(let i=0; i<10; i++) {
    simParticles.push({
      x: x, y: y,
      vx: (Math.random() - 0.5) * 10,
      vy: (Math.random() - 0.5) * 10,
      life: 1.0, color: color
    });
  }
 }

 function updateSimParticles(dt) {
  for(let i = simParticles.length - 1; i >= 0; i--) {
    let p = simParticles[i];
    p.x += p.vx; p.y += p.vy;
    p.life -= dt * 2;
    if(p.life <= 0) simParticles.splice(i, 1);
  }
 }

 function drawSimParticles() {
  simParticles.forEach(p => {
    simCtx.globalAlpha = p.life;
    if (p.text) {
      simCtx.font = `bold ${20 + p.life * 10}px Inter`;
      simCtx.fillStyle = p.color;
      let wobble = Math.sin(Date.now() / 100) * 5;
      simCtx.fillText(p.text, p.x + wobble, p.y);
    } else {
      simCtx.fillStyle = p.color;
      simCtx.beginPath(); simCtx.arc(p.x, p.y, 2, 0, Math.PI*2); simCtx.fill();
    }
  });
  simCtx.globalAlpha = 1.0;
 }

 let simAudioCtx, simOsc, simGain;
 function startSimAudio() {
  try {
    simAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
    simOsc = simAudioCtx.createOscillator();
    simGain = simAudioCtx.createGain();
    simOsc.type = 'sine';
    simOsc.frequency.setValueAtTime(100, simAudioCtx.currentTime);
    simGain.gain.setValueAtTime(0.02, simAudioCtx.currentTime);
    simOsc.connect(simGain);
    simGain.connect(simAudioCtx.destination);
    simOsc.start();
  } catch(e) { console.warn(e); }
 }
 function stopSimAudio() {
  if(simOsc) { try { simOsc.stop(); simOsc.disconnect(); } catch(e){} }
  if(simAudioCtx) try { simAudioCtx.close(); } catch(e){}
 }

 function initSimulator() {
  simCanvas = document.getElementById("sim-canvas");
  if(!simCanvas) return;
  simCtx = simCanvas.getContext("2d");
  const hud = document.querySelector('.sim-hud');
  if (hud && !document.getElementById('sim-battery')) {
    let batDiv = document.createElement('div');
    batDiv.className = 'sim-stat';
    batDiv.innerHTML = 'Battery: <span id="sim-battery" class="text-green">100</span>%';
    hud.appendChild(batDiv);
  }
  document.getElementById("sim-gameover-overlay").classList.add("hidden");
  document.getElementById("sim-start-overlay").classList.remove("hidden");
  renderSimLeaderboard();
 }

 document.getElementById("sim-start-btn")?.addEventListener("click", () => {
  document.getElementById("sim-start-overlay").classList.add("hidden");
  startSimMatch();
 });

 document.getElementById("sim-restart-btn")?.addEventListener("click", () => {
  document.getElementById("sim-gameover-overlay").classList.add("hidden");
  startSimMatch();
 });

 window.addEventListener("keydown", (e) => { keys[e.code] = true; });
 window.addEventListener("keyup", (e) => { 
  keys[e.code] = false; 
  if (e.code === "Space" && simActive) shootSimBall();
 });

 function startSimMatch() {
  simTime = 120; simScore = 0; simIntake = 0; simActive = true;
  simRobot = { x: 300, y: 300, size: 20, speed: 200, dx: 0, dy: 0, angle: 0, vx: 0, vy: 0, acc: 1000, friction: 0.92, battery: 100, isCharging: false, isStunned: false };
  simBalls = []; simParticles = []; simSkids = [];
  for(let i=0; i<10; i++) spawnSimBall();
  updateSimHUD(); checkAchievements();
  simLastTime = performance.now();
  simLoop = requestAnimationFrame(simUpdate);
  startSimAudio();
  
  const container = document.getElementById("game-simulator");
  container.classList.add("game-resetting");
  setTimeout(() => container.classList.remove("game-resetting"), 500);
  playTone(150, 0.5, "sawtooth");

  clearInterval(simTimerInterval);
  simTimerInterval = setInterval(() => {
   simTime--;
   updateSimHUD(); checkAchievements();
   if(simTime <= 0) endSimMatch();
  }, 1000);
 }

 function spawnSimBall() {
  const spots = [ {x:50,y:50}, {x:550,y:50}, {x:50,y:550}, {x:550,y:550}, {x:300,y:300} ];
  const spot = spots[Math.floor(Math.random()*spots.length)];
  for(let i=0; i<3; i++) {
    simBalls.push({
     x: spot.x + (Math.random()-0.5)*60,
     y: spot.y + (Math.random()-0.5)*60,
     radius: 8, vx: 0, vy: 0, active: true
    });
  }
  playTone(1200, 0.05, "sine");
 }

 function shootSimBall() {
  if (simIntake > 0) {
   let scored = false;
   simGoals.forEach(g => {
    let dx = g.x - simRobot.x; let dy = g.y - simRobot.y;
    let dist = Math.hypot(dx, dy);
    if (dist < g.radius + 100) {
      let chance = 1.0 - (dist / 200);
      if (Math.random() < chance) {
        let p = g.pts;
        if (simRobot.battery < 20) p += 5;
        simScore += p;
        simShake = 5;
        triggerConfetti();
        spawnSimParticles(g.x, g.y, g.color);
        for(let i=0; i<5; i++) spawnSimParticles(simRobot.x, simRobot.y, "#fbbf24");
        triggerShake(document.getElementById("sim-score"));
        simParticles.push({ x: g.x, y: g.y, vx: 0, vy: -2, life: 2.0, color: g.color, text: `+${p} ${g.name}!` });
        scored = true;
      }
    }
   });
   if (scored) {
    simIntake--;
    updateSimHUD(); checkAchievements(); spawnSimBall();
    playTone(660, 0.1, "sine");
   } else {
    triggerShake(simCanvas);
    playTone(220, 0.1, "sawtooth");
   }
  } else {
    triggerShake(simCanvas);
  }
 }

 function updateSimHUD() {
  const timeEl = document.getElementById("sim-time");
  if(timeEl) {
    timeEl.textContent = simTime;
    if(simTime < 30) timeEl.classList.add("time-critical");
    else timeEl.classList.remove("time-critical");
  }
  const scoreEl = document.getElementById("sim-score");
  if(scoreEl) scoreEl.textContent = simScore;
  const intakeEl = document.getElementById("sim-intake");
  if(intakeEl) intakeEl.textContent = simIntake + " / 3";
  const batEl = document.getElementById("sim-battery");
  if(batEl) batEl.textContent = Math.floor(simRobot.battery);
 }

 function endSimMatch() {
  simActive = false;
  stopSimAudio();
  clearInterval(simTimerInterval);
  cancelAnimationFrame(simLoop);
  
  simBalls.forEach(b => { if(b.active) spawnSimParticles(b.x, b.y, "#fbbf24"); });
  if(simScore > 200) {
    simRobot.vx = 0; simRobot.vy = 0;
    let spinInt = setInterval(() => { 
      if(simRobot) { simRobot.angle += 0.5; spawnSimParticles(simRobot.x, simRobot.y, "#fbbf24"); }
    }, 50);
    setTimeout(() => clearInterval(spinInt), 2000);
  }
  playTone(110, 1.0, "sawtooth");
  showRamsayToast("win");

  document.getElementById("sim-gameover-overlay").classList.remove("hidden");
  document.getElementById("sim-final-score").textContent = simScore;
  
  let lb = JSON.parse(localStorage.getItem("ftc-sim-lb") || "[]");
  if(lb.length === 0) lb = [{n:"Alpha-Bot 19639",s:350},{n:"Cyber-Slicer",s:280},{n:"Mechanical Mayhem",s:210},{n:"Gear-Grinder",s:180}];
  
  if (lb.length < 10 || simScore > lb[lb.length-1].s) {
    document.getElementById("sim-lb-input").classList.remove("hidden");
    triggerConfetti(); spawnSimParticles(simRobot.x, simRobot.y, "#fbbf24"); showRamsayToast("win");
  } else {
    document.getElementById("sim-lb-input").classList.add("hidden");
  }
 }

 document.getElementById("sim-submit-score")?.addEventListener("click", () => {
  let name = document.getElementById("sim-name-input").value.trim() || "Anonymous";
  let lb = JSON.parse(localStorage.getItem("ftc-sim-lb") || "[]");
  lb.push({n: name, s: simScore});
  lb.sort((a,b) => b.s - a.s);
  lb = lb.slice(0, 10);
  localStorage.setItem("ftc-sim-lb", JSON.stringify(lb));
  document.getElementById("sim-lb-input").classList.add("hidden");
  renderSimLeaderboard();
 });

 function renderSimLeaderboard() {
  let lb = JSON.parse(localStorage.getItem("ftc-sim-lb") || "[]");
  if(lb.length === 0) lb = [{n:"Alpha-Bot 19639",s:350},{n:"Cyber-Slicer",s:280},{n:"Mechanical Mayhem",s:210},{n:"Gear-Grinder",s:180}];
  const list = document.getElementById("sim-lb-list");
  if(!list) return;
  list.innerHTML = "";
  lb.forEach((entry, i) => {
    let li = document.createElement("li");
    li.className = `lb-rank-${i+1}`;
    let badge = i === 0 ? "Rank 1" : (i === 1 ? "Rank 2" : (i === 2 ? "Rank 3" : `#${i+1}`));
    li.innerHTML = `<span><span class="rank-badge">${badge}</span> ${entry.n}</span> <span>${entry.s}</span>`;
    list.appendChild(li);
  });
  if(lb.length > 0) {
    let span = document.querySelector("#hs-simulator span");
    if(span) span.textContent = lb[0].s;
  }
 }

 function Math_clamp(val, min, max) { return Math.max(min, Math.min(max, val)); }

 function simUpdate(time) {
  if(!simActive) return;
  let dt = (time - simLastTime) / 1000;
  simLastTime = time;

  let ax = 0, ay = 0;
  if (keys["ArrowUp"] || keys["KeyW"]) ay = -1;
  if (keys["ArrowDown"] || keys["KeyS"]) ay = 1;
  if (keys["ArrowLeft"] || keys["KeyA"]) ax = -1;
  if (keys["ArrowRight"] || keys["KeyD"]) ax = 1;

  let moveLen = Math.hypot(ax, ay);
  let isBoosting = keys["ShiftLeft"] || keys["ShiftRight"];
  let currentAcc = isBoosting ? simRobot.acc * 2 : simRobot.acc;
  let boostDrain = isBoosting ? 4 : 1;

  if(moveLen > 0 && !simRobot.isCharging && !simRobot.isStunned) {
    simRobot.vx += (ax / moveLen) * currentAcc * dt;
    simRobot.vy += (ay / moveLen) * currentAcc * dt;
    simRobot.angle = Math.atan2(simRobot.vy, simRobot.vx);
    if(isBoosting) spawnSimParticles(simRobot.x, simRobot.y, "rgba(255,255,255,0.5)");
  }

  simRobot.vx *= simRobot.friction; simRobot.vy *= simRobot.friction;
  let currentVel = Math.hypot(simRobot.vx, simRobot.vy);

  if (simRobot.isCharging) {
    simRobot.battery += 15 * dt;
    if (simRobot.battery >= 100) { simRobot.battery = 100; simRobot.isCharging = false; updateSimHUD(); }
  } else {
    if (currentVel > 10) {
      simRobot.battery -= (currentVel / 200) * 5 * boostDrain * dt;
      if (simRobot.battery <= 0) {
        simRobot.battery = 0; simRobot.isCharging = true; simShake = 30;
        spawnSimParticles(simRobot.x, simRobot.y, "#ef4444");
        showRamsayToast("lose"); updateSimHUD();
      }
    } else {
      simRobot.battery += 2 * dt;
      if (simRobot.battery > 100) simRobot.battery = 100;
    }
  }

  simRobot.x += simRobot.vx * dt; simRobot.y += simRobot.vy * dt;

  if (simOsc && simAudioCtx) {
    let pitch = 100 + (currentVel / 400) * 300;
    simOsc.frequency.setTargetAtTime(pitch, simAudioCtx.currentTime, 0.1);
    simGain.gain.setTargetAtTime(currentVel > 5 ? 0.05 : 0.01, simAudioCtx.currentTime, 0.1);
  }

  let inSubmersible = (simRobot.x > 200 && simRobot.x < 400 && simRobot.y > 200 && simRobot.y < 400);
  simRobot.friction = inSubmersible ? 0.85 : 0.92;
  if (Math.random() > 0.95) {
    simParticles.push({ x: 200 + Math.random() * 200, y: 400, vx: (Math.random()-0.5) * 2, vy: -Math.random() * 5, life: 3.0, color: "rgba(59, 130, 246, 0.4)", radius: 2 + Math.random()*3 });
  }

  let hitWall = false;
  if (simRobot.x <= simRobot.size) { simRobot.x = simRobot.size; hitWall = true; }
  if (simRobot.x >= 600 - simRobot.size) { simRobot.x = 600 - simRobot.size; hitWall = true; }
  if (simRobot.y <= simRobot.size) { simRobot.y = simRobot.size; hitWall = true; }
  if (simRobot.y >= 600 - simRobot.size) { simRobot.y = 600 - simRobot.size; hitWall = true; }

  simBarriers.forEach(b => {
    if (simRobot.x + simRobot.size > b.x && simRobot.x - simRobot.size < b.x + b.w &&
      simRobot.y + simRobot.size > b.y && simRobot.y - simRobot.size < b.y + b.h) {
      simRobot.vx *= -0.8; simRobot.vy *= -0.8;
      simRobot.x += simRobot.vx * dt * 2; simRobot.y += simRobot.vy * dt * 2;
      hitWall = true;
    }
  });

  if (hitWall && !simRobot.isStunned && currentVel > 50) {
    simRobot.isStunned = true; simShake = 15;
    spawnSimParticles(simRobot.x, simRobot.y, "#ef4444");
    playTone(110, 0.2, "sawtooth");
    setTimeout(() => { if (simRobot) simRobot.isStunned = false; }, 500);
  }

  for(let i=0; i<simBalls.length; i++) {
   let b = simBalls[i];
   if(b.active && simIntake < 3) {
     let dx = b.x - simRobot.x; let dy = b.y - simRobot.y;
     if(dx*dx + dy*dy < (simRobot.size + b.radius)**2) {
      simParticles.push({ x: b.x, y: b.y, vx: (simRobot.x - b.x) * 0.2, vy: (simRobot.y - b.y) * 0.2, life: 0.3, color: "#fbbf24", size: b.radius });
      b.active = false; simIntake++; playTone(880, 0.05, "sine");
      spawnSimParticles(simRobot.x, simRobot.y, "#0da371");
      updateSimHUD(); checkAchievements();
     }
   }
  }

  simCtx.save();
  if (simShake > 0) {
    simCtx.translate((Math.random()-0.5)*simShake, (Math.random()-0.5)*simShake);
    simShake *= 0.9; if(simShake < 0.1) simShake = 0;
  }
  simCtx.clearRect(-100,-100,800,800);
  simCtx.fillStyle = "#0a0a0c"; simCtx.fillRect(0,0,600,600);
  
  simCtx.fillStyle = "rgba(239, 68, 68, 0.1)"; simCtx.fillRect(0, 0, 100, 100);
  simCtx.fillStyle = "rgba(59, 130, 246, 0.1)"; simCtx.fillRect(500, 500, 100, 100);

  simCtx.strokeStyle = "rgba(13, 163, 113, 0.05)"; simCtx.lineWidth = 1;
  for(let i=0; i<=600; i+=60) { simCtx.beginPath(); simCtx.moveTo(i, 0); simCtx.lineTo(i, 600); simCtx.stroke(); simCtx.beginPath(); simCtx.moveTo(0, i); simCtx.lineTo(600, i); simCtx.stroke(); }

  simCtx.fillStyle = "rgba(13, 163, 113, 0.3)"; simCtx.strokeStyle = "var(--brand-green)"; simCtx.lineWidth = 2;
  simBarriers.forEach(b => { simCtx.fillRect(b.x, b.y, b.w, b.h); simCtx.strokeRect(b.x, b.y, b.w, b.h); });

  simGoals.forEach(g => {
    let goalGradient = simCtx.createRadialGradient(g.x, g.y, 5, g.x, g.y, g.radius);
    goalGradient.addColorStop(0, g.color); goalGradient.addColorStop(1, "rgba(0,0,0,0)");
    simCtx.fillStyle = goalGradient; simCtx.beginPath(); simCtx.arc(g.x, g.y, g.radius + Math.sin(Date.now()/200)*5, 0, Math.PI*2); simCtx.fill();
    simCtx.strokeStyle = g.color; simCtx.lineWidth = 2; simCtx.stroke();
  });

  for(let b of simBalls) {
    if(b.active) {
     simCtx.shadowBlur = 10; simCtx.shadowColor = "#fbbf24"; simCtx.fillStyle = "#fbbf24";
     simCtx.beginPath(); simCtx.arc(b.x, b.y, b.radius, 0, Math.PI*2); simCtx.fill();
     simCtx.shadowBlur = 0;
    }
  }

  simCtx.save();
  let wobbleX = Math.sin(Date.now() / 500) * 2; let wobbleY = Math.cos(Date.now() / 500) * 2;
  simCtx.translate(simRobot.x + wobbleX, simRobot.y + wobbleY);
  simCtx.rotate(simRobot.angle);
  if(simIntake > 0) { simCtx.shadowBlur = 15; simCtx.shadowColor = simIntake === 3 ? "#fbbf24" : "var(--brand-green)"; }
  simCtx.fillStyle = "#1c1c1e"; simCtx.strokeStyle = simRobot.isCharging ? "#ef4444" : "var(--brand-green)"; simCtx.lineWidth = 2;
  simCtx.fillRect(-simRobot.size, -simRobot.size, simRobot.size*2, simRobot.size*2);
  simCtx.strokeRect(-simRobot.size, -simRobot.size, simRobot.size*2, simRobot.size*2);
  
  let ledColor = simRobot.battery > 50 ? "#0da371" : (simRobot.battery > 20 ? "#fbbf24" : "#ef4444");
  if(simIntake === 3) ledColor = (Math.sin(Date.now()/100) > 0) ? "#fbbf24" : "#000";
  simCtx.fillStyle = ledColor;
  simCtx.fillRect(-simRobot.size + 2, -simRobot.size + 2, 3, 3);
  simCtx.fillRect(simRobot.size - 5, -simRobot.size + 2, 3, 3);
  simCtx.fillRect(-simRobot.size + 2, simRobot.size - 5, 3, 3);
  simCtx.fillRect(simRobot.size - 5, simRobot.size - 5, 3, 3);

  simCtx.fillStyle = "rgba(255, 255, 255, 0.8)"; simCtx.fillRect(simRobot.size - 4, -4, 4, 8);
  simCtx.restore();

  updateSimParticles(dt); drawSimParticles();
  
  let vignette = simCtx.createRadialGradient(300, 300, 100, 300, 300, 450);
  vignette.addColorStop(0, "rgba(0,0,0,0)"); vignette.addColorStop(1, "rgba(0,0,0,0.8)");
  simCtx.fillStyle = vignette; simCtx.fillRect(0, 0, 600, 600);

  simCtx.restore();
  simLoop = requestAnimationFrame(simUpdate);
 }
});
