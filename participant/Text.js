export function getText(sequence, qswap = false) {
  if(qswap && sequence == 'question1') sequence = 'question2'
  else if(qswap && sequence == 'question2') sequence = 'question1'
  switch(sequence) {
    case 'question':
      return {
        text: "あなたは2回くじを引きます。それぞれのくじでは1つのオプションを選ぶことができます。",
        question: ["", ""]
      }
    case 'question1':
      return {
        text: (1 + qswap) + "回目のくじのオプションを選んでください。",
　　　　question: [
          "オプションA: 確実に100万円を手にする。", 
          "オプションB: 89％の確率で100万円、10%の確率で250万円を獲得する。ただし、1%の確率で何ももらえない。"
        ]
      }
    case 'question2':
      return {
        text: (2 - qswap) + "回目のくじのオプションを選んでください。",
        question: [
          "オプションA: 11%の確率で100万円を得る。",
          "オプションB: 10%の確率で250万円を得る。"
        ]
      }
    case 'answered':
      return {text: "回答は終了しました。", question: ["", ""]}
  }
}