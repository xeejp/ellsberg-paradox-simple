defmodule AllaisParadox.Host do
  alias AllaisParadox.Main
  alias AllaisParadox.Actions

  # Actions
  def fetch_contents(data) do
    data
    |> Actions.update_host_contents()
  end

  def change_page(data, page) do
    if page in Main.pages do
      %{data | page: page}
      |> Actions.change_page(page)
    else
      data
    end
  end

  def all_reset(data) do
    :random.seed(:os.timestamp)
    flag = true
    data = data |> Map.put(:participants, Enum.into(Enum.map(data.participants, fn { id, _ } ->
      {id,
        %{
          sequence: "question1",
          question1: 0,
          question2: 0,
          active: true,
          joined: Map.size(data.participants),
          qswap: true,
          rational: 0,
          irational: 0,
        }
      }
    end), %{}))
                |> Map.put(:joined, Map.size(data.participants))
                |> Map.put(:answered, 0)
                |> Map.put(:rational, 0)
                |> Map.put(:irational, 0)
    data = data |> Map.put(:participants, data.participants
                |> Map.merge(data.participants
                |> Enum.shuffle
                |> Enum.take_every(2)
                |> Enum.map(fn {id, value} -> {id, Map.put(value, :qswap, false)} end)
                |> Enum.into(%{})))
    Actions.all_reset(data)
  end

  def send_result(data, result) do
    data = data  |> Map.put(:participants, Enum.into(Enum.map(data.participants, fn { id, value } ->
      {id, value |> Map.put(:rational, result["rational"]) |> Map.put(:irational, result["irational"])} end), %{}))
                 |> Map.put(:rational, result["rational"]) |> Map.put(:irational, result["irational"])
                 |> Map.put(:answered, 0)
    Actions.send_result(data, result)
  end

  # Utilities
  def format_contents(data) do
    data
  end
end
