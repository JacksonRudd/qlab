from setuptools import setup, find_packages

setup(
    name='qlab',
    version='1.0.0',
    packages=find_packages(),
    description='Description of your qlab module',
    long_description=open('README.md').read(),
    install_requires=[
        # Any dependencies you have, e.g., 'requests', 'numpy'
    ],
)
