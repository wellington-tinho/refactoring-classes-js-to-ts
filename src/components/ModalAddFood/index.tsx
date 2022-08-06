import { useRef } from 'react';
import { FiCheckSquare } from 'react-icons/fi';

import { Form } from './styles';
import Modal from '../Modal';
import Input from '../Input';
import { IFood } from '../../types/foods';

type DashboardProps = {
  foods: IFood[],
  editingFood: {
    id: number,
  }, 
  modalOpen: boolean,
  editModalOpen: boolean
}

type ModealAddFoodProps = {
  isOpen: boolean,
  setIsOpen: () => void,
  handleAddFood: (food: DashboardProps) => void
}

function ModalAddFood({ isOpen, setIsOpen, handleAddFood }: ModealAddFoodProps) {
  const formRef = useRef(null);


  async function handleSubmit(data: DashboardProps) {
    handleAddFood(data);
    setIsOpen();
  };


  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Novo Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />
        <button type="submit" data-testid="add-food-button">
          <p className="text">Adicionar Prato</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
}

export default ModalAddFood;
