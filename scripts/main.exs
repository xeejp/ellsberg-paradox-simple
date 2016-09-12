defmodule EllsbergParadoxSimple.Main do
  alias EllsbergParadoxSimple.Actions

  @pages ["waiting", "description", "experiment", "result"]
  @sequence ["question1", "question2", "answered"]

  def pages, do: @pages
  def sequence, do: @sequence

  def init do
    %{
      page: "waiting",
      participants: %{},
      joined: 0,
      answered: 0,
      one: 0,
      two: 0,
      question_text: %{
          'question': %{
              text: "壺が2つあり、それぞれ合計100個の赤いボールと黒いボールが入っています。\n壺Aには50個の赤いボールと50個の黒いボールが入っています。\n壺Bには合計100個の赤いボールと黒いボールが入っていますが、その割合はわかりません。\nあなたは、壺から取り出されるボールが赤か黒かを当てることができれば100ドルの賞金を得らます。",
           },
           'question1': %{
             text: "どちらの壺からボールを取り出すかを選んでください。",
              title: ["壺A", "壺B"],
              question: [
                "赤いボールと黒いボールが50個ずつ入っている。", 
                "赤いボールと黒いボールが合計100個入っているが、その比率はわからない。"
              ]
            },
           'question2': %{
             text: "赤いボールと黒いボールどちらが取り出されると思いますか。",
             title: ["赤いボール", "黒いボール"],
             question: ["", ""]
            },
            'answered': %{
              text: "回答は終了しました。他の参加者の回答が終了するまでこのままお待ちください。",
              bingo: "当たりました！おめでとうございます！",
              nbingo: "残念！はずれです！"
           },
           'waiting_text': "参加者の登録を待っています。\nこの画面のまましばらくお待ちください。",
           'description_text': "これから、2つの質問をします。\n選択肢のうち、あなたが最も好むものを選択してください。",
          },
        }
  end

  def new_participant(data) do
    %{
      question_text: data.question_text,
      sequence: "question1",
      question1: 0,
      question2: 0,
      active: true,
      joined: 1,
      qswap: false,
      one: data.one,
      two: data.two,
      bingo: false,
    }
  end

  def join(data, id) do
    unless Map.has_key?(data.participants, id) do
      new = new_participant(data)
      new = new |> Map.put(:joined, Map.size(data.participants) + 1)
      data = data |> Map.put(:participants, Enum.into(Enum.map(data.participants, fn {id, map} ->
        {id, Map.put(map, :joined, Map.size(data.participants) + 1)}
      end), %{}))
      put_in(data, [:participants, id], new)
      |> Actions.join(id, new)
    else
      data
    end
  end

  def wrap(data) do
    {:ok, %{"data" => data}}
  end
end