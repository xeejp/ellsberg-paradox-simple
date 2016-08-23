defmodule AllaisParadox.Main do
  alias AllaisParadox.Actions

  @pages ["waiting", "experiment", "result"]
  @sequence ["question1", "question2", "answered"]

  def pages, do: @pages
  def sequence, do: @sequence

  def init do
    %{
      page: "waiting",
      participants: %{},
      joined: 0,
      answered: 0,
      rational: 0,
      irational: 0,
    }
  end

  def new_participant do
    %{
      sequence: "question1",
      question1: 0,
      question2: 0,
      active: false,
      joined: 1,
      qswap: false,
      rational: 0,
      irational: 0,
    }
  end

  def join(data, id) do
    unless Map.has_key?(data.participants, id) do
      new = new_participant()
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
