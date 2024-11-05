'use client';
import { useEffect, useState } from 'react';
import { Button, Form, Pagination, message } from 'antd';
import { MyCustomInput } from './components/customComponents/CustomNumInput';
import { MyInputForNumber } from './components/customComponents/CustomInputForNumber';
import { MyInputForText } from './components/customComponents/CustomInputForText';
import { MySelect } from './components/customComponents/CustomSelect';
import { MyTextArea } from './components/customComponents/CustomTextArea';
import { ArrowRightOutlined } from '@ant-design/icons';

export interface MyInputForTextInterface {
  customLabel: string;
  customPlaceholder: string;
  customValue: string;
  setCustomValue: (value: string) => void;
  isValid?: boolean;
  options?: { value: string; label: string }[];
}

export default function Home() {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isActiveBtn, setIsActiveBtn] = useState(false);
  const [formData, setFormData] = useState({
    genre: '',
    selectedValueGenre: '',
    selectedValueFormat: '',
    selectedValueCountry: '',
    selectedValuePrice: '',
    sinopsis: '',
    unf: '',
  });
  const [countries, setCountries] = useState([]);
  const [errors, setErrors] = useState({
    genre: false,
    selectedValueGenre: false,
    selectedValueFormat: false,
    selectedValueCountry: false,
    unf: false,
  });

  useEffect(() => {
    //@ts-ignore
    const savedData = JSON.parse(localStorage.getItem(`page-${page}`));
    if (savedData) {
      setFormData(savedData);
    } else {
      setFormData({
        genre: '',
        selectedValueGenre: '',
        selectedValueFormat: '',
        selectedValueCountry: '',
        selectedValuePrice: '',
        sinopsis: '',
        unf: '',
      });
    }
  }, [page]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          'https://namaztimes.kz/ru/api/country?type=json',
        );
        const data = await response.json();
        const transformedCountries = Object.entries(data)
          .map(([key, country]) => ({
            value: key,
            //@ts-ignore
            label: country.trim(),
          }))
          .sort((a, b) => {
            if (a.label === 'Российская Федерация') return -1;
            if (b.label === 'Российская Федерация') return 1;
            return 0;
          });
        //@ts-ignore
        setCountries(transformedCountries);
      } catch (error) {
        console.error('Error fetching country data:', error);
      }
    };

    fetchCountries();
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [field]: false }));
  };

  const deleteInfo = () => {
    setFormData({
      genre: '',
      selectedValueGenre: '',
      selectedValueFormat: '',
      selectedValueCountry: '',
      selectedValuePrice: '',
      sinopsis: '',
      unf: '',
    });

    localStorage.removeItem(`page-${page}`);
  };

  const validateAndSaveData = () => {
    const {
      genre,
      selectedValueGenre,
      selectedValueFormat,
      selectedValueCountry,
      unf,
    } = formData;

    const newErrors = {
      genre: !genre,
      selectedValueGenre: !selectedValueGenre,
      selectedValueFormat: !selectedValueFormat,
      selectedValueCountry: !selectedValueCountry,
      unf: unf.length !== 18,
    };

    setErrors(newErrors);

    const firstErrorField = Object.keys(newErrors).find(
      //@ts-ignore
      (key) => newErrors[key],
    );

    if (firstErrorField) {
      message.error(`Please fill in the ${firstErrorField} correctly.`);
      return;
    }

    localStorage.setItem(`page-${page}`, JSON.stringify(formData));
    setPage((prevPage) => prevPage + 1);
    setTotalPages((prevTotal) => prevTotal + 1);
  };

  useEffect(() => {
    const {
      genre,
      selectedValueGenre,
      selectedValueFormat,
      selectedValueCountry,
      unf,
    } = formData;

    const isUnfValid = unf.length === 18;

    const isFormValid =
      genre &&
      selectedValueGenre &&
      selectedValueFormat &&
      selectedValueCountry &&
      isUnfValid;
    //@ts-ignore
    setIsActiveBtn(isFormValid);
  }, [formData]);

  return (
    <main className="p-6 flex justify-center">
      <div className="flex flex-col gap-10">
        <section className="flex justify-between">
          <b className="md:text-2xl">Производственные параметры фильма</b>
          <Button className="w-[225px] h-[48px]" onClick={() => deleteInfo()}>
            Отменить заполнение
          </Button>
        </section>
        <Form
          layout="vertical"
          className="flex flex-col items-center lg:justify-between lg:flex-wrap lg:flex-row lg:gap-28"
        >
          <div className="flex gap-20 flex-col lg:gap-5">
            <MyInputForText
              customLabel="Название проекта"
              customPlaceholder="Введите текст"
              customValue={formData.genre}
              setCustomValue={(value) => handleInputChange('genre', value)}
              isValid={!errors.genre}
            />
            <MySelect
              customLabel="Жанр"
              customPlaceholder="Жанр"
              customValue={formData.selectedValueGenre}
              setCustomValue={(value) =>
                handleInputChange('selectedValueGenre', value)
              }
              options={[
                { value: '1', label: 'Драма' },
                { value: '2', label: 'Комедия' },
                { value: '3', label: 'Хоррор' },
                { value: '4', label: 'Боевик' },
              ]}
              isValid={!errors.selectedValueGenre}
            />
            <MySelect
              customLabel="Формат"
              customPlaceholder="Формат"
              customValue={formData.selectedValueFormat}
              setCustomValue={(value) =>
                handleInputChange('selectedValueFormat', value)
              }
              options={[
                { value: '1', label: 'Для онлайн-платформ' },
                { value: '2', label: 'Большого экрана' },
                { value: '3', label: 'Интернета' },
                { value: '4', label: 'Другое' },
              ]}
              isValid={!errors.selectedValueFormat}
            />
            <MyCustomInput
              customLabel="UNF"
              customPlaceholder="Введите UNF"
              customValue={formData.unf}
              setCustomValue={(value) => handleInputChange('unf', value)}
              isValid={!errors.unf}
            />
          </div>
          <div className="flex gap-20 flex-col lg:gap-5">
            <MySelect
              customLabel="Страна-производитель (копродукция)"
              customPlaceholder="Страна"
              customValue={formData.selectedValueCountry}
              setCustomValue={(value) =>
                handleInputChange('selectedValueCountry', value)
              }
              options={countries}
              isValid={!errors.selectedValueCountry}
            />
            <MyInputForNumber
              customLabel="Сведения о сметной стоимости производства фильма на территории Нижегородской области, если есть"
              customPlaceholder="Сметная стоимость"
              customValue={formData.selectedValuePrice}
              setCustomValue={(value) =>
                handleInputChange('selectedValuePrice', value)
              }
            />
            <MyTextArea
              customLabel="Синопсис"
              customPlaceholder="Напишите краткое изложение"
              customValue={formData.sinopsis}
              setCustomValue={(value) => handleInputChange('sinopsis', value)}
            />
          </div>
        </Form>
        <footer className="flex justify-end items-center space-x-[-200px]">
          <div className="flex justify-center items-center w-full">
            <Pagination
              current={page}
              onChange={setPage}
              total={totalPages * 10}
            />
          </div>
          <Button
            onClick={validateAndSaveData}
            className="w-[248px] h-[48px]"
            icon={<ArrowRightOutlined />}
            disabled={!isActiveBtn}
          >
            Следующий шаг
          </Button>
        </footer>
      </div>
    </main>
  );
}

