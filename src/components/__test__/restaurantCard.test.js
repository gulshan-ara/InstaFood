import { render, screen } from "@testing-library/react";
import RestaurantCard from "../RestaurantCard";
import MOCK_DATA from "../../components/mocks/resCardMock.json";
import "@testing-library/jest-dom";

describe("Should render resCard correctly", () => {
  it("Should render resCard with props data", () => {
    render(<RestaurantCard resData={MOCK_DATA} />);
    const cardText = screen.getByText("KFC");
    expect(cardText).toBeInTheDocument();
  });
});
