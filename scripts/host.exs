defmodule AllaisParadox.Host do
  alias AllaisParadox.Main
  alias AllaisParadox.Actions

  require Logger

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
    data = data |> Map.put(:participants, Enum.into(Enum.map(data.participants, fn { id, _ } ->
      {id,
        %{
          sequence: "question1",
          question1: 0,
          question2: 0,
          active: true,
        }
      }
    end), %{}))
    Actions.all_reset(data)
  end

  # Utilities
  def format_contents(data) do
    data
  end
end
