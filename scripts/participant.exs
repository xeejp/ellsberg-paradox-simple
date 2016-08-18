defmodule AllaisParadox.Participant do
  alias AllaisParadox.Actions

  require Logger

  # Actions
  def fetch_contents(data, id) do
    Actions.update_participant_contents(data, id)
  end

  def next_question(data, id, selected) do
    Logger.debug('asdfasfasdfadfsad#{selected["next"]} #{selected["selected"]}')
    data = data |> put_in([:participants, id, :sequence], selected["next"])
    data = case selected do
             {"question2", select} -> data |> put_in([:participants, id, :question1], select)
             {"answered" , select} -> data |> put_in([:participants, id, :question2], select)
                                 _ -> data
            end
    Actions.next_question(data, id, selected)
  end

  # Utilities
  def format_participant(participant), do: participant

  def format_data(data) do
    %{
      page: data.page,
    }
  end

  def format_contents(data, id) do
    %{participants: participants} = data
    participant = Map.get(participants, id)
    format_participant(participant)
      |> Map.merge(format_data(data))
  end
end
