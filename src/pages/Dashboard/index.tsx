import { useEffect, useState } from 'react';

import Header from '../../components/Header';
import api from '../../services/api';
import Food from '../../components/Food';
import ModalAddFood from '../../components/ModalAddFood';
import ModalEditFood from '../../components/ModalEditFood';
import { FoodsContainer } from './styles';
import { IFood } from '../../types/foods';

type DashboardProps = {
  foods: IFood[],
  editingFood: {
    id: number,
  }, 
  modalOpen: boolean,
  editModalOpen: boolean
}

function Dashboard() {
    const initialState = {
      foods: [] as IFood[],
      editingFood: {},
      modalOpen: false,
      editModalOpen: false,
    } as DashboardProps;

    const [state, setState] = useState(initialState);
    const {foods, editingFood, modalOpen, editModalOpen } = state;
    

    useEffect(() => {
      async function loadFoods(): Promise<void> {
        const { data } = await api.get('/foods');
        setState(prev=> ({ ...prev, foods: data }));
      }
      loadFoods();
    }, []);



  const handleAddFood = async (food: DashboardProps) =>{
    try {
      const response = await api.post('/foods', {
        ...food,
        available: true,
      });

      setState(prev=> ({ ...prev, foods: [...foods, response.data] }));
    } catch (err) {
      console.log(err);
    }
  }

  const handleUpdateFood = async (food: DashboardProps) =>{
    try {
      const foodUpdated = await api.put(
        `/foods/${editingFood.id}`,
        { ...editingFood, ...food },
      );

      const foodsUpdated = foods.map(f =>
        f.id !== foodUpdated.data.id ? f : foodUpdated.data,
      );

      setState(prev=> ({ ...prev, foods: foodsUpdated }));
    } catch (err) {
      console.log(err);
    }
  }
  
  const handleDeleteFood = async (id: number) => {
    await api.delete(`/foods/${id}`);
    const foodsFiltered = foods.filter(food => food.id !== id);
    setState(prev=> ({ ...prev, foods: foodsFiltered }));
  }

  const toggleModal = () => {
    setState(prev=> ({ ...prev, modalOpen: !modalOpen }));
  }

  const toggleEditModal = () => {
    setState(prev=> ({ ...prev, editModalOpen: !editModalOpen }));
  }

  const handleEditFood = (food: IFood) => {
    setState(prev=> ({ ...prev, editingFood: food, editModalOpen: true }));
  }


  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />
      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      />

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map(food => (
            <Food
              key={food.id}
              food={food}
              handleDelete={handleDeleteFood}
              handleEditFood={handleEditFood}
            />
          ))}
      </FoodsContainer>
    </>
  );
}


export default Dashboard;
