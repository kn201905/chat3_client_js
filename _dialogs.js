'use strict';

function ShowDLG_multi_cnnct_on_InitRI(times_cnct, past_time_1st_cnct, pass_phrs) {

	g_dlg_bx.ApndTxt_MultiLine([
		'今、利用されている IP から、短時間で複数回の接続が検出されました。'
		, '１つの IP からの接続は、15分間で３回までに制限されています。'
		, '最初の接続は「' + past_time_1st_cnct + '秒前」にありました。'
		, '現在、「' + times_cnct + '回目」の接続となっています。'
	]);

	const e_div_1 = g_dlg_bx.Crt_Div();
	e_div_1.style.marginTop = '1em';
	e_div_1.textContent = '接続を開始するために、下の空欄にパスワードを入力してください。';
	const e_div_2 = g_dlg_bx.Crt_Div();
	e_div_2.textContent = 'パスワードは「' + pass_phrs + '」です。';

	const m_e_ipt_pass_phrs = document.createElement('input');
	m_e_ipt_pass_phrs.style.padding = '5px 10px';
	m_e_ipt_pass_phrs.style.width = '8em';
	m_e_ipt_pass_phrs.onkeyup = OnKeyUp_pass_phrs;

	const e_div_3 = g_dlg_bx.Crt_Div();
	e_div_3.appendChild(m_e_ipt_pass_phrs);
	
	g_dlg_bx.SetTxt_1st_Btn('パスワード入力完了');
	g_dlg_bx.SetFn_1st_Btn(OnClk_OK_pass_phrs);
	g_dlg_bx.Dsbl_1st_Btn();

	g_dlg_bx.Show();
	m_e_ipt_pass_phrs.focus();

	// -------------------------------------
	function OnKeyUp_pass_phrs() {
		const len = m_e_ipt_pass_phrs.value.trim().length;
		if (len == 4) {
			g_dlg_bx.Enbl_1st_Btn();
		} else {
			g_dlg_bx.Dsbl_1st_Btn();
		}
	}

	function OnClk_OK_pass_phrs() {
		const str = m_e_ipt_pass_phrs.value.trim();
		const str_reg = str.replace(/[０-９]/g, (s) => {
    		return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
		});
		const num_ipt = parseInt(str_reg);

		if (num_ipt == pass_phrs)
		{
			g_dlg_bx_2.Show_Txt('認証成功！', false, 910);
			g_dlg_bx.Close();
			g_DN_Init_RI.Decode_Body();
		}
		else
		{
			g_dlg_bx_2.Show_Txt('認証失敗。正しいパスワードを入力してください。', false, 910);
			m_e_ipt_pass_phrs.value = '';
			g_dlg_bx.Dsbl_1st_Btn();
		}
	}
}
