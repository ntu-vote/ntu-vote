insert into ntu_vote.campaign_rules values(1, '多數決', 1, '簡單多數決');

insert into ntu_vote.campaigns values(1, '重啟核四', '您是否同意核四啟封商轉發電？', 'active', '2021-11-19T08:00:00Z', '2021-11-21T23:59:59Z', '', 1);
insert into ntu_vote.candidate_info values(1, '同意', '同意重啟核四', 1);
insert into ntu_vote.candidate_info values(2, '不同意', '不同意重啟核四', 1);

insert into ntu_vote.campaigns values(2, '反萊豬進口', '你是否同意政府應全面禁止進口含有瘦肉精（萊克多巴胺等乙型受體素）豬隻之肉品、內臟及其相關產製品？', 'active', '2021-11-19T08:00:00Z', '2021-11-21T23:59:59Z', '', 1);
insert into ntu_vote.candidate_info values(3, '同意', '同意反萊豬進口', 2);
insert into ntu_vote.candidate_info values(4, '不同意', '不同意反萊豬進口', 2);

insert into ntu_vote.campaigns values(3, '公投綁大選', '你是否同意公民投票案公告成立後一個月起至六個月內，若該期間內有全國性選舉時，公民投票應與該選舉同日舉行？', 'active', '2021-11-19T08:00:00Z', '2021-11-21T23:59:59Z', '', 1);
insert into ntu_vote.candidate_info values(5, '同意', '同意公投綁大選', 3);
insert into ntu_vote.candidate_info values(6, '不同意', '不同意公投綁大選', 3);

insert into ntu_vote.campaigns values(4, '珍愛藻礁', '您是否同意中油第三天然氣接收站遷離桃園大潭藻礁海岸及海域？', 'active', '2021-11-19T08:00:00Z', '2021-11-21T23:59:59Z', '', 1);
insert into ntu_vote.candidate_info values(7, '同意', '同意中油第三天然氣接收站遷離', 4);
insert into ntu_vote.candidate_info values(8, '不同意', '不同意中油第三天然氣接收站遷離', 4);