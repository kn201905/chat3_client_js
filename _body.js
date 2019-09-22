'use strict';

// ロビーに表示されている RI を全て保持するクラス
// rmID と doj_RI との変換を担う
// Doj_Topic.Regist() で push される
const ga_mng_doj_RI = new function() {
	const ma_RmID = [];
	const ma_doj_RI = [];

	this.push = (doj_RI) => {
		ma_RmID.push(doj_RI.Get_RoomID());
		ma_doj_RI.push(doj_RI);
	};

	// doj_room_info が返される
	this.Search_byRmID = (rmID) => {
		const idx = ma_RmID.indexOf(rmID);
		if (idx < 0) {
			alert('該当 rmID なし : ga_mng_doj_RI.Search_byRmID()');
			return null;
		}

		return ma_doj_RI[idx];
	};

	this.Remove_byRmID = (rmID) => {
		const idx = ma_RmID.indexOf(rmID);
		if (idx < 0) {
			alert('該当 rmID なし : ga_mng_doj_RI.Remove_byRmID()');
			return;
		}

		ma_RmID.splice(idx, 1);
		ma_doj_RI.splice(idx, 1);
	};

	this.Clear = () => {
		ma_RmID.splice(0);
		ma_doj_RI.splice(0);
	};
};

/*
// 将来的に、g_doj_modal_scrn の利用は停止する
const g_doj_modal_scrn = new function() {
	const m_e_scrn_mask = document.createElement('div');
	m_e_scrn_mask.style.position = 'fixed';
	m_e_scrn_mask.style.left = 0;
	m_e_scrn_mask.style.top = 0;
	m_e_scrn_mask.style.right = 0;
	m_e_scrn_mask.style.bottom = 0;

	m_e_scrn_mask.style.zIndex = 10;
	m_e_scrn_mask.hidden = true;

	this.e_lump = m_e_scrn_mask;

	this.Show = (fn_CB = null, z_idx = 10) => {
		m_e_scrn_mask.onclick = fn_CB;
		m_e_scrn_mask.style.zIndex = z_idx;
		m_e_scrn_mask.hidden = false
	}
	this.Hide = () => { m_e_scrn_mask.hidden = true; }
};
*/

////////////////////////////////////////////////////////////////

let g_my_uID = -1;
let g_my_uname = null;
// uview は、今後仕様が変更されれる可能性が高いため、doj_crt_usr で管理する

//const g_doj_color = new Doj_Color();
//const g_doj_rating = new Doj_Rating();
//const g_doj_body_setting = new Doj_Body_Setting();

//const g_doj_crt_usr = new Doj_CreateUser();
//const g_doj_char_pick = new Doj_Char_Pick();
//g_doj_crt_usr.Apnd_CharPick(g_doj_char_pick);

//const g_Room_Voices = new Doj_Room_Voices();
//const g_doj_fixd_msg = new Doj_Fmsg();
//g_doj_fixd_msg.Hide();  // Edge に対応するため、ここで Hide() をコールしている
//const g_doj_room_etc = new Doj_Room_etc();
//g_doj_room_etc.Hide();  // Edge に対応するため、ここで Hide() をコールしている
//const g_doj_room = new Doj_Room();
//g_doj_room.e_lump.appendChild(g_Room_Voices.e_lump);

// ---------------------------------------------
// 以下の２つの変数は、new Doj_Topic() で更新される
let g_nextID_doj_topic = 0;
const ga_doj_topic = [];  // Doj_Topic の array


// 現時点では、Doj_TopicBindr は１つしかないから、拡張する場合は気をつけること
/*
const g_doj_topic_bindr = new Doj_TopicBindr();
// 本来は、変数を用意しなくてもよい（サンプル作成のため）
g_doj_topic_bindr.Regist(new Doj_Topic('雑談'));
g_doj_topic_bindr.Regist(new Doj_Topic('スポーツ'));
g_doj_topic_bindr.Regist(new Doj_Topic('料理'));
g_doj_topic_bindr.Regist(new Doj_Topic('プログラミング'));
g_doj_topic_bindr.Regist(new Doj_Topic('ブロックＥ'));
*/
// ---------------------------------------------

/*
const g_doj_set_room_prof = new Doj_SetRoomProf();
const g_doj_set_room_capa = new Doj_SetRoomCapa();
// トピックが生成された後でないと、トピックセレクタは生成できない。
const g_doj_topic_slctr = new Doj_TopicSlctr();
g_doj_set_room_prof.Apnd_CapaSlctr(g_doj_set_room_capa);
g_doj_set_room_prof.Apnd_TopicSlctr(g_doj_topic_slctr);
*/

// ---------------------------------------------
//g_doj_body.Append(g_doj_crt_usr);
//g_doj_body.Append(g_doj_set_room_prof);
//g_doj_body.Append(g_doj_color);

// デバッグコンソール。不必要になればコメントアウトすること
g_doj_body.Append(g_doj_dbgcnsl);

//g_doj_body.Append(g_doj_topic_bindr);
//g_doj_body.Append(g_doj_room);
//g_doj_body.Append(g_doj_fixd_msg);
//g_doj_body.Append(g_doj_room_etc);

//g_doj_body.Append(g_doj_rating);
//g_doj_body.Append(g_doj_body_setting);

//g_doj_body.Append(g_doj_modal_scrn);



// 全ての UI が完成してから、以下のコードが走るようにすること
/*
const g_view_Lobby = new function() {
	let m_bShow = true;
	let m_iconSz_Showed = g_stt.icoSz_Lby;

	this.Show = () => {
		if (m_iconSz_Showed !== g_stt.icoSz_Lby) { this.Resize(); }

		// トピックバインダが増えた場合は、以下のコードの訂正に注意
		g_doj_topic_bindr.Show();

		m_bShow = true;
	};

	this.Hide = () => {
		if (g_doj_body_setting.IsVisible()) {
			g_doj_rating.onclick();
		}
		// トピックバインダが増えた場合は、以下のコードの訂正に注意
		g_doj_topic_bindr.Hide();

		m_bShow = false;
	}

	// g_stt.icoSz_Lby にサイズを合わせるメソッド
	this.Resize = () => {
		if (m_iconSz_Showed === g_stt.icoSz_Lby) { return; }

		for (let doj_topic of ga_doj_topic) { doj_topic.Resize(); }
		m_iconSz_Showed = g_stt.icoSz_Lby;
	};
};
*/


