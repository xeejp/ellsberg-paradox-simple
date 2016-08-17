export function getText(sequence) {
  switch(sequence) {
    case 'question1':
      return {
        text: "以下の選択肢がある場合、どちらを選ぶか答えてください。",
　　　　question: [
          "確実に100万円を手にする。", 
          "賭けをする。89％の確率で100万円を得、10%の確率で250万円を獲得する。ただし、1%の確率で何ももらえない。"
        ]
      }
    case 'question2':
      return {
        text: "以下の選択肢がある場合、どちらを選ぶか答えてください。",
        question: [
          "11%の確率で100万円を得る。",
          "10%の確率で250万円を得る。"
        ]
      }
    case 'answered':
      return {text: "回答は終了しました。", question: ["", ""]}
  }
}