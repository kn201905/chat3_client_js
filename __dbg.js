m_uname = 'あいうえお';

let str = '';
for (let i = 0; i < m_uname.length; i++) {
	const chcode = m_uname.charCodeAt(i);
	str += chcode.toString(16) + ' ';
}
console.log(str);
