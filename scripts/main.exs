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
    }
  end

  def new_participant do
    %{
      sequence : "question1",
      question1: 0,
      question2: 0,
    }
  end

  def join(data, id) do
    unless Map.has_key?(data.participants, id) do
      new = new_participant()
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
