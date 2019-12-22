import styled from "styled-components";

export const Table = styled.table`
	align-self: center;
	border: collapse;
	width: 100%;
	border-radius: 20px;
	margin-bottom: 40px;
`;

export const TableRow = styled.tr`
	 border-bottom: 1px solid grey;
	// :nth-of-type(odd) {
	// 	background: #eaeaea;
	// }
	// :nth-of-type(even) {
	// 	background: #ffffff;
	// }
`;
export const TableHeader = styled.th`
	background: #333;
	color: white;
	font-weight: bold;
	padding: 6px;
	border: 1px solid #ccc;
	text-align: center;
`;

export const TableData = styled.td`
	padding-top: 15px;
	padding-bottom: 15px;
	
	text-align: center;
	color: ${props => (props.bgcolor ? props.bgcolor : "black")};	
	font-weight: '800';
`;

export const LinkButton = styled.button`
	border: 1px solid #111111
	cursor: pointer;
	padding: 5px;
	margin: 2px 2px;
	background: rgb(56, 205, 240);
	color: #fff;
`;

export const Select = styled.select`
	height: 28px;
	width: 20%;
	border: 1px solid #111111;
	background: white;
	color: gray;
	font-size: 14px;
	option {
		color: black;
		background: white;
		display: flex;
		white-space: pre;
		padding: 0px 2px 1px;
	}
	@media (max-width: 485px) {
		font-size: 10px;
	}
`;

export const FilterDiv = styled.div`
	margin-top: 1.5em;
	display: flex;
	width: 100%;
	justify-content: space-around;
	align-content: center;
`;

export const RadioLabel = styled.label``;

export const RadioButton = styled.input``;